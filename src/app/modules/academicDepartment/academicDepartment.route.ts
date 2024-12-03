import express from "express";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.post("/create-academic-department", AcademicDepartmentControllers.createAcademicDepartment)

export const AcademicDepartmentRoutes = router;