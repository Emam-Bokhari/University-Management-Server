import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';


const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    // success response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    })
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const studentId=req.params.studentId;
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    // success response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student is retrieved successfully",
      data: result,
    })
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudent(studentId)

    // success response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student is deleted successfully",
      data: result
    })

  } catch (err) {
    next(err)
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
