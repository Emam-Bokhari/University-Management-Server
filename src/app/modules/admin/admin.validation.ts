import { z } from 'zod';

const createUserNameValidationSchema = z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
});

const updateUserNameValidationSchema = z.object({
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
});

const createAdminValidationSchema = z.object({
    body: z.object({
        admin: z.object({
            name: createUserNameValidationSchema,
            designation: z.string(),
            gender: z.enum(['male', 'female']),
            dateOfBirth: z.string(),
            email: z.string(),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            profileImage: z.string(),
            isDeleted: z.boolean().default(false),
        }),
    }),
});

const updateAdminValidationSchema = z.object({
    body: z.object({
        faculty: z.object({
            name: updateUserNameValidationSchema.optional(),
            designation: z.string().optional(),
            gender: z.enum(['male', 'female']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloodGroup: z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            profileImage: z.string().optional(),
            isDeleted: z.boolean().default(false).optional(),
        }),
    }),
});

export const adminValidationSchema = {
    createFacultyValidationSchema: createAdminValidationSchema,
    updateFacultyValidationSchema: updateAdminValidationSchema,
};
