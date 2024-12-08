import express from "express";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmin);

router.get("/:adminId", AdminControllers.getSingleAdmin);

router.patch("/:adminId", AdminControllers.updateAdmin);

router.delete("/:adminId", AdminControllers.deleteAdmin);

export const AdminRoutes = router;