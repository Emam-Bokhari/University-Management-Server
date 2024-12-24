import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TStatusChange, TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { verifyToken } from '../auth/auth.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_Pass as string);

  // set student role
  userData.role = 'student';

  // set student email
  userData.email = payload.email;

  // find academic semeser info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(404, 'Academic semester not found!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set manually generated if
    userData.id = await generateStudentId(admissionSemester);

    // transction:1
    // create a user
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user!');
    }

    payload.id = newUser[0].id; // embedding ID
    payload.user = newUser[0]._id; // reference ID

    // transction:2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create student!');
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const facultyData: Partial<TUser> = {};

  facultyData.password = password || (config.default_Pass as string);

  // set faculty role
  facultyData.role = 'faculty';

  // set faculty email
  facultyData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    facultyData.id = await generateFacultyId();

    // transction:1
    // create a new user
    const newUser = await User.create([facultyData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user!');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // transction:2
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty!');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const adminData: Partial<TUser> = {};

  adminData.password = password || (config.default_Pass as string);

  // set admin role
  adminData.role = 'admin';

  // set admin email
  adminData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    adminData.id = await generateAdminId();

    const newUser = await User.create([adminData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create a user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const changeStatusInDB = async (id: string, payload: { status: TStatusChange }) => {

  const result = await User.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

  return result;
}

const getMe = async (userId: string, role: string) => {

  let result = null;

  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate("user");
  }
  if (role === 'student') {
    result = await Student.findOne({ id: userId })
      .populate("user");
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate("user");
  }

  return result;


};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  changeStatusInDB,
  getMe,
};

/* 
transction-->Steps
Step:1
start session
Step:2
start transction
Step:3
data k array hisebe pathano, abong sathe session ta pathiye daoua
Step:4
error ta throw kore daoua
Step:5
successfull hoile commit transction kore daoua
Step:6
session ta end kore daoua
Step:7
abort transction kora
Step:8
session ta end kora

*/
