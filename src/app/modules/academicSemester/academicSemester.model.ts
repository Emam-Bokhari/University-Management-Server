import { Schema, model } from "mongoose";
import { TAcademicSemester, TMonths } from "./academicSemester.interface";

const months: TMonths[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]



const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: ["Autumn", "Summer", "Fall"],
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    code: {
        type: String,
        enum: ["01", "02", "03"],
        required: true,
    },
    startMonth: {
        type: String,
        enum: months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: months,
        required: true,
    },
},
    {
        timestamps: true,
    }
)

export const AcademicSemesterSchema = model<TAcademicSemester>("AcademicSemester", academicSemesterSchema)