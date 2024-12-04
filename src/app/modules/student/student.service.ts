import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate("admissionSemester").populate({
    path: "academicDepartment",
    populate: ({
      path: "academicFaculty"
    })
  });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id });
  const result = await Student.aggregate([
    //stage:1
    { $match: { id: id } },
    //stage:2
    {
      $lookup: {
        from: "academicsemesters", // collection name
        localField: "admissionSemester", // field in the student model
        foreignField: "_id", // field in the admission semester
        as: "admissionSemester" // alias name of populated data
      }
    },
    //stage:3
    {
      $lookup: {
        from: "academicdepartments",
        localField: "academicDepartment",
        foreignField: "_id",
        as: "academicDepartment"
      }
    },
    //stage:4
    { $unwind: "$academicDepartment" },
    //stage:5
    {
      $lookup: {
        from: "academicfaculties",
        localField: "academicDepartment.academicFaculty",
        foreignField: "_id",
        as: "academicDepartment.academicFaculty"
      }
    }
  ])
  return result;
};

const deleteStudent = async (id: string) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction()

    const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

    if (!deleteStudent) {
      throw new AppError(400, "Failed to delete student!")
    }

    const deletedUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session })

    if (!deletedUser) {
      throw new AppError(400, "Failed to delete user!");
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err;
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudent,
};
