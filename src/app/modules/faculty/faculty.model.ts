import { model, Schema } from "mongoose";
import { TFaculty } from "./faculty.interface";

const facultyNameSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
});

const facultySchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, "User ID is required"],
            unique: true,
            ref: "User",
        },
        name: {
            type: facultyNameSchema, // Properly embedding the schema
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: {
                values: ["male", "female"],
                message: "{VALUE} is either male or either female",
            },
        },
        dateOfBirth: {
            type: String,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        contactNo: {
            type: String,
            trim: true,
            required: true,
        },
        emergencyContactNo: {
            type: String,
            trim: true,
            required: true,
        },
        presentAddress: {
            type: String,
            trim: true,
            required: true,
        },
        profileImage: {
            type: String,
            required: true,
        },
        academicFaculty: {
            type: String,
            required: true,
        },
        academicDepartment: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Faculty = model<TFaculty>("Faculty", facultySchema);
