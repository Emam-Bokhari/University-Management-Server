import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { EnrolledCourseServices } from './enrolledCourse.service';
import sendResponse from '../../utils/sendResponse';

const createEnrolledCourse: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const data = req.body;

  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    data,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Successfully enrolled course',
    data: result,
  });
});

const updateEnrolledCourseMarks: RequestHandler = catchAsync(
  async (req, res) => {
    const facultyId = req.user?.userId;
    const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
      facultyId,
      req.body,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Enrolled course marks is update successfully',
      data: result,
    });
  },
);

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
