import express from 'express';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { validateRequest } from '../../middlewares/validateRequest';
import { enrolledCourseValidationSchema } from './enrolledCourse.validation';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.patch("/update-enrolled-course-marks", auth(USER_ROLE.faculty), validateRequest(enrolledCourseValidationSchema.updateEnrolledCourseMarksValidationZodSchema), EnrolledCourseControllers.updateEnrolledCourseMarks)

export const EnrolledCourseRoutes = router;
