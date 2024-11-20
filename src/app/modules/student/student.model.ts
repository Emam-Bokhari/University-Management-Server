import { Schema, model } from 'mongoose';
import { StudentModel, TStudent, TUserName } from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
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
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

// document middleware
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// aggregate middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
