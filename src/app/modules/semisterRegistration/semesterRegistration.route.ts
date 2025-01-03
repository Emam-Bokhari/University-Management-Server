import express from 'express';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { semesterRegistrationValidationSchema } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidationSchema.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);

router.get(
  '/:semesterRegistrationId',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
