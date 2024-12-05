import { z } from 'zod';

const createUserNameValidationSchema = z.object({
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

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .min(5, 'The length must be at least 5 characters')
    .max(50, 'First name can not exceed 50 characters').optional(),
  middleName: z
    .string()
    .trim()
    .max(50, 'Middle name can not exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name can not exceed 50 characters').optional(),
});

const createGurdianValidationSchema = z.object({
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

const updateGurdianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, "Father's name is required."),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, "Father's occupation is required.").optional(),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, "Father's contact number is required.").optional(),
  motherName: z.string().trim().min(1, "Mother's name is required.").optional(),
  motherOccupation: z
    .string()
    .trim()
    .min(1, "Mother's occupation is required.").optional(),
  motherContactNo: z
    .string()
    .trim()
    .min(1, "Mother's contact number is required.").optional(),
});

const createLocalGurdianValidationSchema = z.object({
  name: z.string().trim().min(1, "Guardian's name is required."),
  occupation: z.string().trim().min(1, "Guardian's occupation is required."),
  contactNo: z.string().trim().min(1, "Guardian's contact number is required."),
  address: z.string().trim().min(1, "Guardian's address is required."),
});

const updateLocalGurdianValidationSchema = z.object({
  name: z.string().trim().min(1, "Guardian's name is required.").optional(),
  occupation: z.string().trim().min(1, "Guardian's occupation is required.").optional(),
  contactNo: z.string().trim().min(1, "Guardian's contact number is required.").optional(),
  address: z.string().trim().min(1, "Guardian's address is required.").optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: createUserNameValidationSchema,
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
      gurdian: createGurdianValidationSchema,
      localGurdian: createLocalGurdianValidationSchema,
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      profileImage: z.string().trim().optional(),
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({
          message: "Gender must be either 'male' or 'female'",
        }),
      }).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .trim()
        .email('Invalid email address.')
        .min(1, 'Email address is required.').optional(),
      contactNo: z.string().trim().min(1, 'Contact number is required.').optional(),
      emergencyContactNo: z
        .string()
        .trim()
        .min(1, 'Emergency contact number is required.').optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim().min(1, 'Present address is required.').optional(),
      permanentAddress: z
        .string()
        .trim()
        .min(1, 'Permanent address is required.').optional(),
      gurdian: updateGurdianValidationSchema,
      localGurdian: updateLocalGurdianValidationSchema,
    }),
  }),
});

export const studentValidationSchema = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}