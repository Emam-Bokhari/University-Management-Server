import express from "express";
import { FacultyControllers } from "./faculty.controller";

const router = express.Router();

router.get("/", FacultyControllers.getAllFaculty);

router.get("/:facultyId", FacultyControllers.getSingleFaculty);

router.patch("/:facultyId", FacultyControllers.updateFaculty);

router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRouter = router;