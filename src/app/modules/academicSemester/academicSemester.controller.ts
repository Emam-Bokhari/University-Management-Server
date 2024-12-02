import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  // success response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const academicSemesterId = req.params.academicSemesterId;
    const result =
      await academicSemesterServices.getSingleAcademicSemesterFromDB(
        academicSemesterId,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic semester is retrieved successfully',
      data: result,
    });
  },
);

const updateAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const academicSemesterId = req.params.academicSemesterId;
  const updatedData = req.body;
  const result = await academicSemesterServices.updateAcademicSemesterInDB(
    academicSemesterId,
    updatedData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update academic semster successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
