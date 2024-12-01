import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicSemesterValidationSchema } from './academicSemester.validation';

const router = express.Router();

router.use(
  '/create-academic-semester',
  validateRequest(academicSemesterValidationSchema),
  academicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
