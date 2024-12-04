import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_Pass as string);

  // set student role
  userData.role = 'student';

  // find academic semeser info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(404, 'Academic semester not found!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction()
    // set manually generated if
    userData.id = await generateStudentId(admissionSemester);

    // transction:1
    // create a user
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(400, "Failed to create user!")
    }

    payload.id = newUser[0].id; // embedding ID
    payload.user = newUser[0]._id; // reference ID

    // transction:2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(400, "Failed to create student!")
    }
    await session.commitTransaction()
    await session.endSession()

    return newStudent;

  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err;
  }
};

export const UserServices = {
  createStudentIntoDB,
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
