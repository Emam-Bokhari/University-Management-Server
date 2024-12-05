import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicDepartmentValidationSchema } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   academicDepartmentValidationSchema.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

router.get(
  '/:academicDepartmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:academicDepartmentId',
  validateRequest(
    academicDepartmentValidationSchema.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
