import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { facultyValidationSchema } from './faculty.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
);

router.get('/:facultyId', FacultyControllers.getSingleFaculty);

router.patch(
  '/:facultyId',
  validateRequest(facultyValidationSchema.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:facultyId', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
