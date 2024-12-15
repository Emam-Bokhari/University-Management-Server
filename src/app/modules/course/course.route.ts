import express from 'express';
import { CourseControllers } from './course.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { courseValidationSchema } from './course.validation';
import { sanitizeRequestMiddleware } from '../../middlewares/sanitize.middleware';

const router = express.Router();

router.post(
  '/create-course',
  sanitizeRequestMiddleware,
  validateRequest(courseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);

router.get('/:courseId', CourseControllers.getSingleCourse);

router.patch(
  '/:courseId',
  validateRequest(courseValidationSchema.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  CourseControllers.assignCourseFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  CourseControllers.deleteCourseFaculties,
);

router.delete('/:courseId', CourseControllers.deleteCourse);

export const CourseRoutes = router;
