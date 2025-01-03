import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload?.id);
  // console.log(user)

  if (!user) {
    throw new AppError(404, 'The user is not found!');
  }

  // // checking if the user is Deleted
  if (user.isDeleted === true) {
    throw new AppError(403, 'The user is deleted!');
  }

  // // checking if the user is blocked
  if (user.status === 'blocked') {
    throw new AppError(403, 'The user is blocked!');
  }

  // // checking if the password is matched
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(403, 'Password do not mathced!');
  }

  // create token and sent to the client

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData?.userId);
  // console.log(user)

  if (!user) {
    throw new AppError(404, 'The user is not found!');
  }

  // // checking if the user is Deleted
  if (user.isDeleted === true) {
    throw new AppError(403, 'The user is deleted!');
  }

  // // checking if the user is blocked
  if (user.status === 'blocked') {
    throw new AppError(403, 'The user is blocked!');
  }

  // // checking if the password is matched
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(403, 'Password do not mathced!');
  }

  // hashed new password before update
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { id: userData?.userId, role: userData?.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

const forgetPassword = async (userId: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);
  // console.log(user)

  if (!user) {
    throw new AppError(404, 'The user is not found!');
  }

  // // checking if the user is Deleted
  if (user.isDeleted === true) {
    throw new AppError(403, 'The user is deleted!');
  }

  // // checking if the user is blocked
  if (user.status === 'blocked') {
    throw new AppError(403, 'The user is blocked!');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_reset_secret as string,
    config.jwt_reset_expires_in as string,
  );

  // url,id,token
  const reset_link = `${config.reset_password_link}?id=${user.id}&token=${resetToken}`;

  sendEmail(user?.email, reset_link);
  // console.log(reset_link)
};

const resetPassword = async (
  userId: string,
  newPassword: string,
  token: string,
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);
  // console.log(user)

  if (!user) {
    throw new AppError(404, 'The user is not found!');
  }

  // // checking if the user is Deleted
  if (user.isDeleted === true) {
    throw new AppError(403, 'The user is deleted!');
  }

  // // checking if the user is blocked
  if (user.status === 'blocked') {
    throw new AppError(403, 'The user is blocked!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_reset_secret as string,
  ) as JwtPayload;

  // console.log(decoded, userId)
  if (decoded.userId !== userId) {
    throw new AppError(403, 'Forbidden');
  }

  // hashed new password before update
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { id: decoded.userId, role: decoded.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
};

export const AuthServices = {
  loginUser,
  changePasswordIntoDB,
  forgetPassword,
  resetPassword,
};
