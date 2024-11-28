import { z } from "zod";

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: "Password must be string"
    })
        .max(11, { message: "Password can not be exceeds 11 characters" })
});

export default userValidationSchema;