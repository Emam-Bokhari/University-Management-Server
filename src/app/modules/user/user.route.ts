import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidationSchema } from '../student/student.validation';
import { facultyValidationSchema } from '../faculty/faculty.validation';
import { adminValidationSchema } from '../admin/admin.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { changeStatus } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth('admin'),
  validateRequest(studentValidationSchema.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(facultyValidationSchema.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(adminValidationSchema.createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.patch("/change-status/:id", auth(USER_ROLE.admin), validateRequest(changeStatus), UserControllers.changeStatus)

router.get('/me', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), UserControllers.getMe);


export const UserRoutes = router;
