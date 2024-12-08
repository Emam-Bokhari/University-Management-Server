import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interface';

const TUserNameSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
  },
});

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
    },
    name: {
      type: TUserNameSchema,
      required: true,
    },
    designation: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is must be either male or female',
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
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
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
    profileImage: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model<TAdmin>('Admin', adminSchema);
