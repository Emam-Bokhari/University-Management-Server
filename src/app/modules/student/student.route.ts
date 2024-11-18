import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/', StudentControllers.createStudent);

router.get('/', StudentControllers.getAllStudents);


export const StudentRoutes = router;
