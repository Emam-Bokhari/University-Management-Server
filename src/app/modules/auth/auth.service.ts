import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt"

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const isUserExists = await User.findOne({ id: payload?.id });

    if (!isUserExists) {
        throw new AppError(404, "The user is not found!")
    }

    // checking if the user is Deleted
    const isDeleted = isUserExists?.isDeleted;
    if (isDeleted === true) {
        throw new AppError(403, "The user is deleted!")
    }

    // checking if the user is blocked
    const userStatus = isUserExists?.status;
    if (userStatus === "blocked") {
        throw new AppError(403, "The user is blocked!")
    }

    // checking if the password is matched
    const isPasswordMatched = await bcrypt.compare(payload?.password, (isUserExists?.password as string));

    console.log(isPasswordMatched)

    return null;
}

export const AuthServices = {
    loginUser,
}