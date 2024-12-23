import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'ID is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string(),
  })
})

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "ID is required!" })
  })
})

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "ID is required!" }),
    newPassword: z.string({ required_error: "New Password is required!" })
  })
})

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
