import { Schema, model } from "mongoose"
import { Student } from "./student.interface"

const userSchema = new Schema<Student>({
    id: {
        type: String,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    profileImage: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    gurdian: {
        fatherName: {
            type: String,
            required: true,
        },
        fatherOccupation: {
            type: String,
            required: true,
        },
        fatherContactNo: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        motherOccupation: {
            type: String,
            required: true,
        },
        matherContactNo: {
            type: String,
            required: true,
        },

    },
    localGurdian: {
        name: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    isActive: {
        type: String,
        enum: ["active", "blocked"],
    }
})