import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { Student } from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';

const createEnrolledCourseIntoDB = async (
    userId: string,
    payload: TEnrolledCourse,
) => {
    const { offeredCourse } = payload;

    // check if offeredCourse is exists
    const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

    if (!isOfferedCourseExists) {
        throw new AppError(404, 'Offered course not found!');
    }

    if (isOfferedCourseExists.maxCapacity <= 0) {
        throw new AppError(400, 'Room is filledup!');
    }

    const student = await Student.findOne({ id: userId }, { _id: 1 });

    // check if the student is already enrolled
    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        offeredCourse: offeredCourse,
        student: student?._id,
    });

    if (isStudentAlreadyEnrolled) {
        throw new AppError(409, 'This student is already enrolled!');
    }

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        // transaction:1
        const result = await EnrolledCourse.create([{
            semesterRegistration: isOfferedCourseExists.semesterRegistration,
            academicSemester: isOfferedCourseExists.academicSemester,
            academicDepartment: isOfferedCourseExists.academicDepartment,
            offeredCourse: offeredCourse,
            course: isOfferedCourseExists.course,
            student: student?._id,
            isEnrolled: true,
            faculty: isOfferedCourseExists.faculty,
        }], { session });

        // if failed to enrolled course
        if (!result) {
            throw new AppError(400, 'Failed to enrolled this course!');
        }

        const maxCapacity = isOfferedCourseExists.maxCapacity;

        // transaction:2
        await OfferedCourse.findByIdAndUpdate([offeredCourse], {
            maxCapacity: maxCapacity - 1,
        }, { session });

        await session.commitTransaction()
        await session.endSession()

        return result;
    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        throw err
    }
};

export const EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
};
