import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
    }
})

export const AcademicFaculty = model<TAcademicFaculty>("AcademicFaculty", academicFacultySchema);