import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

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

    // if (user.passwordChangeAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)) {
    //   throw new AppError(401, "You are not authorized!")
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};
