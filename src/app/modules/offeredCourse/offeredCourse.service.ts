import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semisterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty } = payload;

    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);

    if (!isSemesterRegistrationExists) {
        throw new AppError(404, "Semester registration not found!");
    }

    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);

    if (!isAcademicFacultyExists) {
        throw new AppError(404, "Academic faculty not found!");
    }

    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);

    if (!isAcademicDepartmentExists) {
        throw new AppError(404, "Academic department not found!");
    }

    const isCourseExists = await Course.findById(course);

    if (!isCourseExists) {
        throw new AppError(404, "Academic faculty not found!");
    }

    const isfacultyExists = await Faculty.findById(faculty);

    if (!isfacultyExists) {
        throw new AppError(404, "Faculty not found!");
    }

    const result = await OfferedCourse.create({ ...payload, academicSemester });

    return result;
}

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
}