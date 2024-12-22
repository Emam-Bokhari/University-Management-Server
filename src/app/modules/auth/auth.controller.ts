import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'This is a authenticate user',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {


  const { ...passwordData } = req.body;

  const result = await AuthServices.changePasswordIntoDB(req.user, passwordData);
  // console.log(req.user, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully changed the password",
    data: result,
  })
})

const forgetPassword: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reset link is generated successfully",
    data: result,
  })
})

export const AuthControllers = {
  loginUser,
  changePassword,
  forgetPassword,
};
