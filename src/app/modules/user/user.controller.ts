import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;


        // if validation passes, create a student in database
        const result = await UserServices.createStudentIntoDB(password, studentData)

        // successfull response
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Student is created successfully",
            data: result,
        })
    } catch (err) {
        next(err)
    }
};

export const UserControllers = {
    createStudent,
}
