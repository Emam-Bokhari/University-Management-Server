import express from "express";
import { OfferedCourseControllers } from "./offeredCourse.controller";

const router = express.Router();

router.post("/create-offered-course", OfferedCourseControllers.createOfferedCourse)

export const OfferedCourseRoutes = router;