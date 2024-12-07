import { Faculty } from "./faculty.model"

const getAllFacultyFromDB = async () => {
    const result = await Faculty.find();

    return result;
}

const getSingleFacultyFromDB = async (facultyId: string) => {
    const result = await Faculty.findOne({ _id: facultyId });

    return result;
}

export const FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
}