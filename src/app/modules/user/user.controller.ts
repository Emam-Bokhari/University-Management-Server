import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;


        // if validation passes, create a student in database
        const result = await UserServices.createStudentIntoDB(password, studentData)

        // successfull response
        res.status(201).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        });
    } catch (err) {
        next(err)
    }
};

export const UserControllers = {
    createStudent,
}
