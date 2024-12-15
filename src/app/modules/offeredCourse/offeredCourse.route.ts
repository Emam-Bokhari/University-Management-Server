import express from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { offeredCourseValidationSchema } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(
    offeredCourseValidationSchema.createOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch('/:offeredCourseId', OfferedCourseControllers.updateOfferedCourse);

export const OfferedCourseRoutes = router;
