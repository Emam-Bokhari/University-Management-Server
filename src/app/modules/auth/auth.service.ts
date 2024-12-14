import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(payload?.id)

    if (!user) {
        throw new AppError(404, "The user is not found!")
    }

    // // checking if the user is Deleted
    if (user.isDeleted === true) {
        throw new AppError(403, "The user is deleted!")
    }


    // // checking if the user is blocked
    if (user.status === "blocked") {
        throw new AppError(403, "The user is blocked!")
    }

    // // checking if the password is matched
    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(403, "Password do not mathced!")
    }

    return null;
}

export const AuthServices = {
    loginUser,
}