import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicFacultyValidationSchema } from './academicFaculty.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicFacultyValidationSchema.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

router.get(
  '/:academicFacultyId',
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  '/:academicFacultyId',
  validateRequest(
    academicFacultyValidationSchema.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
