import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: AcademicSemesterName,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        enum: AcademicSemesterCode,
        required: true,
    },
    startMonth: {
        type: String,
        enum: Months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: Months,
        required: true,
    },
},
    {
        timestamps: true,
    }
)



export const AcademicSemester = model<TAcademicSemester>("AcademicSemester", academicSemesterSchema)