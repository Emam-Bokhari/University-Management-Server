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

const getAllAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic department ara retrived successfully",
        data: result,
    })
})

const getSingleAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
    const academicDepartmentId = req.params.academicDepartmentId;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(academicDepartmentId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic dapartment is retrieved successfully",
        data: result,
    })
})

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
}