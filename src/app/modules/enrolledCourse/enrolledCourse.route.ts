import express from 'express';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.patch("/update-enrolled-course-marks", auth(USER_ROLE.faculty), EnrolledCourseControllers.updateEnrolledCourseMarks)

export const EnrolledCourseRoutes = router;
