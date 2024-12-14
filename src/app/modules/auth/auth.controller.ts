import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const loginUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "This is a authenticate user",
        data: result,
    })
})

export const AuthControllers = {
    loginUser,
}