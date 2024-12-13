import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { OfferedCourseServices } from './offeredCourse.service';
import sendResponse from '../../utils/sendResponse';

const createOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
};
