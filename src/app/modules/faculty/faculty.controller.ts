import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.service";
import sendResponse from "../../utils/sendResponse";

const getAllFaculty: RequestHandler = catchAsync(async (req, res) => {

    const result = await FacultyServices.getAllFacultyFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Faculty ara retrieved successfully",
        data: result,
    })
})


export const FacultyControllers = {
    getAllFaculty,
}