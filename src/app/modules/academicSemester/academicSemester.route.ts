import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicSemesterValidationSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidationSchema.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

router.get('/', academicSemesterControllers.getAllAcademicSemester);

router.get(
  '/:academicSemesterId',
  academicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:academicSemesterId',
  validateRequest(
    academicSemesterValidationSchema.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
