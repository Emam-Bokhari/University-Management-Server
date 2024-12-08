import { model, Schema } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursess = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.ObjectId

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
    preRequisiteCoursess: {
        type: [preRequisiteCoursess]
    }
})

export const Course = model<TCourse>("Course", courseSchema)