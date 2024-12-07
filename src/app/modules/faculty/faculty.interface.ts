import { Types } from "mongoose";

type TName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

export type TFaculty = {
    id: string;
    user: Types.ObjectId;
    name: TName,
    designation: string;
    gender: ["male", "female"];
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    profileImage: string;
    academicFaculty: string;
    academicDepartment: string;
    isDeleted: boolean;
}