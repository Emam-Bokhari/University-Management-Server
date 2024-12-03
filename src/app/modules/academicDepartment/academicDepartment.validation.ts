import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Department must be a string"
        }),
        academicFaculty: z.string({
            required_error: "Academic Faculty is required"
        })
    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Department must be a string"
        }).optional(),
        academicFaculty: z.string({
            required_error: "Academic Faculty is required"
        }).optional()
    })
})

export const academicDepartmentValidationSchema = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
}