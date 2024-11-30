import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .min(5, 'The length must be at least 5 characters')
    .max(50, 'First name can not exceed 50 characters'),
  middleName: z
    .string()
    .trim()
    .max(50, 'Middle name can not exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name can not exceed 50 characters'),
});

const gurdianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, "Father's name is required."),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, "Father's occupation is required."),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, "Father's contact number is required."),
  motherName: z.string().trim().min(1, "Mother's name is required."),
  motherOccupation: z
    .string()
    .trim()
    .min(1, "Mother's occupation is required."),
  motherContactNo: z
    .string()
    .trim()
    .min(1, "Mother's contact number is required."),
});

const localGurdianValidationSchema = z.object({
  name: z.string().trim().min(1, "Guardian's name is required."),
  occupation: z.string().trim().min(1, "Guardian's occupation is required."),
  contactNo: z.string().trim().min(1, "Guardian's contact number is required."),
  address: z.string().trim().min(1, "Guardian's address is required."),
});

export const studentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidationSchema,
      profileImage: z.string().trim().optional(),
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({
          message: "Gender must be either 'male' or 'female'",
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .trim()
        .email('Invalid email address.')
        .min(1, 'Email address is required.'),
      contactNo: z.string().trim().min(1, 'Contact number is required.'),
      emergencyContactNo: z
        .string()
        .trim()
        .min(1, 'Emergency contact number is required.'),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim().min(1, 'Present address is required.'),
      permanentAddress: z
        .string()
        .trim()
        .min(1, 'Permanent address is required.'),
      gurdian: gurdianValidationSchema,
      localGurdian: localGurdianValidationSchema,
    }),
  }),
});
