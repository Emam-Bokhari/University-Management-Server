import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester;

    // check academic semester exists
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)

    if (!isAcademicSemesterExists) {
        throw new AppError(404, "This academic semester is not found!")
    }

    // check semester exist
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({ academicSemester: academicSemester })

    if (isSemesterRegistrationExists) {
        throw new AppError(409, "This semester is already registered!");
    }

    const result = await SemesterRegistration.create(payload);

    return result;
}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
}