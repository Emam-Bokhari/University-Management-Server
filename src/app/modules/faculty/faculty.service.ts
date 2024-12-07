import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model"

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
    const result = await Faculty.updateOne({ id: facultyId }, { isDeleted: true }, { new: true })

    return result;
}

export const FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateFacultyIntoDB,
    deleteFacultyFromDB,
}