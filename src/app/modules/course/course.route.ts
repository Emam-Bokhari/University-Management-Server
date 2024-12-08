import express from "express";
import { CourseControllers } from "./course.controller";

const router = express.Router();

router.post("/create-course", CourseControllers.createCourse);

router.get("/", CourseControllers.getAllCourses);

router.get("/:courseId", CourseControllers.getSingleCourse);

router.delete("/:courseId", CourseControllers.deleteCourse);

export const CourseRoutes = router;