import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
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
    } catch (err: any) {
        console.log(err);

        //general error handling
        res.status(500).json({
            success: false,
            message: err.message || 'An error occurred while creating the student',
            error: err,
        });
    }
};

export const UserControllers = {
    createStudent,
}
