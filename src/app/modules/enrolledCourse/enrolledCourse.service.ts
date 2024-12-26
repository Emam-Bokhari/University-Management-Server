import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { Student } from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { SemesterRegistration } from '../semisterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';



/**
 * Enrolls a student into a course, with validation checks and database transaction handling.
 * The function ensures that the student is not already enrolled, the course has available capacity,
 * and the student doesn't exceed the credit limit for the semester. If all checks pass, the student is
 * enrolled, and the course capacity is updated accordingly.
 * 
 * @param {string} userId - The unique identifier of the student who is enrolling in the course.
 * This ID is used to associate the enrollment with the specific student in the database.
 * 
 * @param {TEnrolledCourse} payload - The data required to create an enrolled course in the database.
 * It contains the offered course ID, which is used to fetch the course details and validate the enrollment.
 * 
 * @returns {Promise<any>} The result of the course enrollment transaction. If successful, returns
 * the created enrollment record. If any validation fails, an `AppError` is thrown with a status code and message.
 * 
 * @throws {AppError} Throws an error if:
 *   - The offered course does not exist.
 *   - The course is full.
 *   - The student is already enrolled in the course.
 *   - The student exceeds the credit limit for the semester.
 *   - The enrollment process or course capacity update fails during the transaction.
 */

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

    const course = await Course.findById(isOfferedCourseExists.course);

    if (isOfferedCourseExists.maxCapacity <= 0) {
        throw new AppError(400, 'Room is filledup!');
    }

    const student = await Student.findOne({ id: userId });

    // check if the student is already enrolled
    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        offeredCourse: offeredCourse,
        student: student?._id,
    });

    if (isStudentAlreadyEnrolled) {
        throw new AppError(409, 'This student is already enrolled!');
    }

    // check credit
    const semesterRegistration = await SemesterRegistration.findById(
        isOfferedCourseExists.semesterRegistration,
    ).select('maxCredit');

    // total enrolled credits+new enrolled course credit > maxCredit
    const enrolledCourses = await EnrolledCourse.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExists.semesterRegistration,
                student: student?._id,
            },
        },
        // stage:2
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'enrolledCourseData',
            },
        },
        // stage:3
        {
            $unwind: '$enrolledCourseData',
        },
        // stage:4
        {
            $group: {
                _id: null,
                totalEnrolledCridits: { $sum: '$enrolledCourseData.credits' },
            },
        },
        // stage:5
        {
            $project: {
                _id: 0,
                totalEnrolledCridits: 1,
            },
        },
    ]);

    // console.log(enrolledCourses)
    const totalCredits =
        enrolledCourses.length > 0 ? enrolledCourses[0]?.totalEnrolledCridits : 0;

    // console.log(totalCredits)

    if (
        totalCredits &&
        semesterRegistration?.maxCredit &&
        totalCredits + course?.credits > semesterRegistration?.maxCredit
    ) {
        throw new AppError(400, 'You have exceeded maximum number of credits!');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // transaction:1
        const result = await EnrolledCourse.create(
            [
                {
                    semesterRegistration: isOfferedCourseExists.semesterRegistration,
                    academicSemester: isOfferedCourseExists.academicSemester,
                    academicDepartment: isOfferedCourseExists.academicDepartment,
                    offeredCourse: offeredCourse,
                    course: isOfferedCourseExists.course,
                    student: student?._id,
                    isEnrolled: true,
                    faculty: isOfferedCourseExists.faculty,
                },
            ],
            { session },
        );

        // if failed to enrolled course
        if (!result) {
            throw new AppError(400, 'Failed to enrolled this course!');
        }

        const maxCapacity = isOfferedCourseExists.maxCapacity;

        // transaction:2
        await OfferedCourse.findByIdAndUpdate(
            [offeredCourse],
            {
                maxCapacity: maxCapacity - 1,
            },
            { session },
        );

        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
};

export const EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
};
