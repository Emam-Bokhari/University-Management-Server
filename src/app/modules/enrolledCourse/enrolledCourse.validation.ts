import { z } from 'zod';

const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const enrolledCourseValidationSchema = {
  createEnrolledCourseValidationSchema,
};
