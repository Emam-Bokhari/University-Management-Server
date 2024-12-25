import { model, Schema } from 'mongoose';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { Grade } from './enrolledCourse.constant';

const courseMarksSchema = new Schema({
    classTest1: {
        type: Number,
        default: 0,
    },
    midTerm: {
        type: Number,
        default: 0,
    },
    classTest2: {
        type: Number,
        default: 0,
    },
    finalTerm: {
        type: Number,
        default: 0,
    },
});

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
    {
        semesterRegistration: {
            type: Schema.ObjectId,
            required: true,
            ref: 'semesterRegistration',
        },
        academicSemester: {
            type: Schema.ObjectId,
            required: true,
            ref: 'academicSemester',
        },
        academicDepartment: {
            type: Schema.ObjectId,
            required: true,
            ref: 'academicDepartment',
        },
        offeredCourse: {
            type: Schema.ObjectId,
            required: true,
            ref: 'offeredCourse',
        },
        course: {
            type: Schema.ObjectId,
            required: true,
            ref: 'course',
        },
        student: {
            type: Schema.ObjectId,
            required: true,
            ref: 'student',
        },
        faculty: {
            type: Schema.ObjectId,
            required: true,
            ref: 'faculty',
        },
        isEnrolled: {
            type: Boolean,
            default: false,
        },
        courseMarks: {
            type: courseMarksSchema,
            default: {}
        },
        grade: {
            type: String,
            enum: Grade,
            default: 'NA',
        },
        gradePoints: {
            type: Number,
            min: 0,
            max: 4,
            default: 0,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const EnrolledCourse = model<TEnrolledCourse>(
    'EnrolledCourse',
    enrolledCourseSchema,
);
