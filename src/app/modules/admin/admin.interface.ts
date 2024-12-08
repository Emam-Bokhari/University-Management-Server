import { Types } from 'mongoose';

type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TAdmin = {
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    designation: string;
    gender: ['male', 'female'];
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImage?: string;
    isDeleted: boolean;
};
