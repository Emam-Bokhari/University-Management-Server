import { Schema, model } from 'mongoose';
import { StudentMethods, StudentModel, TStudent, TUserName } from './student.interface';
// import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
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
    trim: true,
    required: true,
  },
});

const gurdianSchema = new Schema({
  fatherName: {
    type: String,
    trim: true,
    required: true,
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: true,
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: true,
  },
  motherName: {
    type: String,
    trim: true,
    required: true,
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: true,
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: true,
  },
});

const localGurdianSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  occupation: {
    type: String,
    trim: true,
    required: true,
  },
  contactNo: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    trim: true,
    required: true,
  },
  profileImage: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],

      message: '{VALUE} is not valid',
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
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    trim: true,
    required: true,
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: true,
  },
  gurdian: {
    type: gurdianSchema,
    required: true,
  },
  localGurdian: {
    type: localGurdianSchema,
    required: true,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: "Status must be either 'active' or 'blocked'",
    },
    default: 'active',
  },
});



studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id })
  return existingUser;
}



export const Student = model<TStudent, StudentModel>('Student', studentSchema);
