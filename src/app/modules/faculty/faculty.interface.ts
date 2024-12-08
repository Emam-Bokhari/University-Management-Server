import { Types } from 'mongoose';

type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: TName;
  designation: string;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
