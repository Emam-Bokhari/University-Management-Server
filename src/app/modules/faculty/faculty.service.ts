import { Faculty } from "./faculty.model"

const getAllFacultyFromDB = async () => {
    const result = await Faculty.find();

    return result;
}

export const FacultyServices = {
    getAllFacultyFromDB,
}