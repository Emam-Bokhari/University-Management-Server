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

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
    const facultyId = req.params.facultyId;

    const result = await FacultyServices.getSingleFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Faculty is retrieved successfully",
        data: result,
    })
})


export const FacultyControllers = {
    getAllFaculty,
    getSingleFaculty,
}