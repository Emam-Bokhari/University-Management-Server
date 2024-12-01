import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.service";
import sendResponse from "../../utils/sendResponse";

const createAcademicSemester: RequestHandler = catchAsync(async (req, res,) => {
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(req.body);

    // success response
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Academic semester created successfully",
        data: result,
    })
})

export const academicSemesterControllers = {
    createAcademicSemester,
}