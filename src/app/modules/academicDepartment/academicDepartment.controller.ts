import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";
import sendResponse from "../../utils/sendResponse";

const createAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
    const academicDepartmentData = req.body;
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(academicDepartmentData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Academic department created successfully",
        data: result,
    })
})

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
}