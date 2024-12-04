import { Schema, model } from 'mongoose';
import { StudentModel, TStudent, TUserName } from './student.interface';
import AppError from '../../errors/AppError';

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
  user: {
    type: Schema.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  admissionSemester: {
    type: Schema.ObjectId,
    required: [true, 'Admission semester ID is required'],
    ref: 'AcademicSemester',
  },
  academicDepartment: {
    type: Schema.ObjectId,
    required: [true, "Academic department ID is required"],
    ref: "AcademicDepartment"
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
    required: [true, 'Gener is required'],
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// aggregate middleware
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isExist = await Student.findOne({ id: query.id });
  if (!isExist) {
    throw new AppError(404, "The student does not exist!")
  }
  next();
})

studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
