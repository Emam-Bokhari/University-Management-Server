import express from "express";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";

const router = express.Router()

router.post("/create-semester-registration", SemesterRegistrationControllers.createSemesterRegistration)

export const SemesterRegistrationRoutes = router;