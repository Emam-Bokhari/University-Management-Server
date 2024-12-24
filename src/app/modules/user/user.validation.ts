import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(11, { message: 'Password can not be exceeds 11 characters' })
    .optional(),
});

export default userValidationSchema;

export const changeStatus = z.object({
  body: z.object({
    status: z.enum(['in-progress', 'blocked']),
  }),
});
