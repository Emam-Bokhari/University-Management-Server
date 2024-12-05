import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  // success response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  // const studentId=req.params.studentId;
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  // success response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const studentData = req.body.student;
  const result = await StudentServices.updateStudentIntoDB(
    studentId,
    studentData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.deleteStudent(studentId);

  // success response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
