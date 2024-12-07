import { TAcademicFaculty } from "../academicFaculty/academicFaculty.interface";
import { Faculty } from "./faculty.model"

const getAllFacultyFromDB = async () => {
    const result = await Faculty.find();

    return result;
}

const getSingleFacultyFromDB = async (facultyId: string) => {
    const result = await Faculty.findOne({ id: facultyId });

    return result;
}

const updateFacultyIntoDB = async (facultyId: string, payload: Partial<TAcademicFaculty>) => {
    const result = await Faculty.updateOne({ id: facultyId }, payload, { new: true })

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