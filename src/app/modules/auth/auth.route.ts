import express from 'express';
import { AuthControllers } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post('/reset-password', AuthControllers.resetPassword);

export const AuthRoutes = router;
