import express from "express";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.post("/create-academic-department", AcademicDepartmentControllers.createAcademicDepartment)

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment)

router.get("/:academicDepartmentId", AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch("/:academicDepartmentId", AcademicDepartmentControllers.updateAcademicDepartment);

export const AcademicDepartmentRoutes = router;