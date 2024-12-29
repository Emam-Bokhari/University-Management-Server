import { model, Schema } from 'mongoose';
import { TFaculty } from './faculty.interface';
import AppError from '../../errors/AppError';

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

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: facultyNameSchema, // Properly embedding the schema
      required: true,
    },
    designation: {
      type: String,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is either male or either female',
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
      default: '',
    },
    academicDepartment: {
      type: Schema.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
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

// query middleware
facultySchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('updateOne', async function (next) {
  const query = this.getQuery();
  const isExist = await Faculty.findOne({ id: query.id });

  if (!isExist) {
    throw new AppError(400, 'This faculty ID does not exist!');
  }
  next();
});

// aggregate middleware
facultySchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Faculty = model<TFaculty>('Faculty', facultySchema);
