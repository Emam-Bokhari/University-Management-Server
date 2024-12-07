import mongoose from "mongoose";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model"
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";

const getAllFacultyFromDB = async () => {
    const result = await Faculty.find();

    return result;
}

const getSingleFacultyFromDB = async (facultyId: string) => {
    const result = await Faculty.findOne({ id: facultyId });

    return result;
}

const updateFacultyIntoDB = async (facultyId: string, payload: Partial<TFaculty>) => {
    const { name, ...remainingFacultyData } = payload;

    const modefiedUpdatedData: Record<string, unknown> = {
        ...remainingFacultyData
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modefiedUpdatedData[`name.${key}`] = value;
        }
    }

    const result = await Faculty.updateOne({ id: facultyId }, modefiedUpdatedData, { new: true })

    return result;
}

const deleteFacultyFromDB = async (facultyId: string) => {

    const session = await mongoose.startSession();



    try {
        session.startTransaction()

        const deletedFaculty = await Faculty.findOneAndUpdate({ id: facultyId }, { isDeleted: true }, { new: true, session })

        if (!deletedFaculty) {
            throw new AppError(400, "Failed to delete faculty!");
        }

        const deleteUser = await User.findOneAndUpdate({ id: facultyId }, { isDeleted: true }, { new: true, session })

        if (!deleteUser) {
            throw new AppError(400, "Failed to delete user!");
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedFaculty;
    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        throw err;
    }
}

export const FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateFacultyIntoDB,
    deleteFacultyFromDB,
}