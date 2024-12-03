import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const academicFacultyData = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(
      academicFacultyData,
    );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Created academic faculty successfully',
    data: result,
  });
});

const getAllAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculties are retreived successfully',
    data: result,
  });
});

const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const academicFacultyId = req.params.academicFacultyId;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDB(
        academicFacultyId,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic faculty is retrieved successfully',
      data: result,
    });
  },
);

const updateAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const academicFacultyId = req.params.academicFacultyId;
  const updatedData = req.body;
  const result = await AcademicFacultyServices.updateAcademicFacultyInDB(
    academicFacultyId,
    updatedData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
