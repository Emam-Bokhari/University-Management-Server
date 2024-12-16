import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidationSchema } from '../student/student.validation';
import { facultyValidationSchema } from '../faculty/faculty.validation';
import { adminValidationSchema } from '../admin/admin.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidationSchema.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(facultyValidationSchema.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(adminValidationSchema.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
