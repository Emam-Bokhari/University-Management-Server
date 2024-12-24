import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // console.log(req.file, req.body)

  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  );

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
  const result = await UserServices.createFacultyIntoDB(req.file, password, facultyData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const password = req.body.password;
  const adminData = req.body.admin;

  const result = await UserServices.createAdminIntoDB(req.file, password, adminData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

const changeStatus: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await UserServices.changeStatusInDB(id, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Status change successfully',
    data: result,
  });
});

const getMe: RequestHandler = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Data is retrived successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  changeStatus,
  getMe,
};
