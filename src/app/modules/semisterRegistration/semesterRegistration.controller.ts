import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { SemesterRegistrationServices } from "./semesterRegistration.service";
import sendResponse from "../../utils/sendResponse";

const createSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
    const semesterRegistrationData = req.body;
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(semesterRegistrationData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Semester registered successfully",
        data: result,
    })
})

const getAllSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Semester Registration retrieved successfully",
        data: result,
    })
})

export const SemesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistration,
}