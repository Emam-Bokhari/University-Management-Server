import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // if validation passes, create a student in database
  const result = await UserServices.createStudentIntoDB(password, studentData);

  // successfull response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const facultyData = req.body.faculty;
  const password = req.body.password;
  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
};
