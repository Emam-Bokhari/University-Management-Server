import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semisterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime } = payload;

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

    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty: academicFaculty,
    })

    if (!isDepartmentBelongToFaculty) {
        throw new AppError(400, `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`)
    }

    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration: semesterRegistration,
        course: course,
        section: section,
    });

    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(400, "Offered course with same section is already exists!")
    };

    // get the schedules of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime')

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    assignedSchedules?.forEach((schedule) => {
        const existingStartTime = new Date(`1970-01-01T${schedule?.startTime}`)
        const existingEndTime = new Date(`1970-01-01T${schedule?.endTime}`)
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`)

        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            throw new AppError(429, "This faculty is not available at that time! Choose other time or day")
        }

    })




    const result = await OfferedCourse.create({ ...payload, academicSemester });

    return result;
}

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
}