import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculties, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCourses = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.ObjectId,
        ref: "Course"

    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
})


const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        trim: true,
        required: true,
    },
    code: {
        type: Number,
        trim: true,
        required: true,
    },
    credits: {
        type: Number,
        trim: true,
        required: true,
    },
    preRequisiteCourses: {
        type: [preRequisiteCourses]
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
})

export const Course = model<TCourse>("Course", courseSchema)

const courseFacultySchema = new Schema<TCourseFaculties>({
    course: {
        type: Schema.ObjectId,
        required: true,
        unique: true,
        ref: "Course",
    },
    faculties: [
        {
            type: Schema.ObjectId,
            ref: "Faculty"
        }
    ]
})

export const CourseFaculty = model<TCourseFaculties>("CourseFaculty", courseFacultySchema)