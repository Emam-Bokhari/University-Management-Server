import express from "express";
import { FacultyControllers } from "./faculty.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { facultyValidationSchema } from "./faculty.validation";

const router = express.Router();

router.get("/", FacultyControllers.getAllFaculty);

router.get("/:facultyId", FacultyControllers.getSingleFaculty);

router.patch("/:facultyId", validateRequest(facultyValidationSchema.updateFacultyValidationSchema), FacultyControllers.updateFaculty);

router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;