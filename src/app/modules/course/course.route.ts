import express from "express";
import { CourseControllers } from "./course.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { courseValidationSchema } from "./course.validation";

const router = express.Router();

router.post("/create-course", validateRequest(courseValidationSchema.createCourseValidationSchema), CourseControllers.createCourse);

router.get("/", CourseControllers.getAllCourses);

router.get("/:courseId", CourseControllers.getSingleCourse);

router.delete("/:courseId", CourseControllers.deleteCourse);

export const CourseRoutes = router;