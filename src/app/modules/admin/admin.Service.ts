import mongoose from 'mongoose';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const getAllAdminFromDB = async () => {
    const result = await Admin.find();

    return result;
};

const getSingleAdminFromDB = async (adminId: string) => {
    const result = await Admin.findOne({ id: adminId });

    return result;
};

const updateAdminIntoDB = async (adminId: string, payload: Partial<TAdmin>) => {

    const { name, ...remainingAdminData } = payload;

    const modefiedUpdatedData: Record<string, unknown> = {
        ...remainingAdminData
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modefiedUpdatedData[`name.${key}`] = value;
        }
    }


    const result = await Admin.updateOne({ id: adminId }, modefiedUpdatedData, { new: true });

    return result;
};

const deleteAdminFromDB = async (adminId: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedAdmin = await Admin.updateOne(
            { id: adminId },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedAdmin) {
            throw new AppError(400, 'Failed to delete admin!');
        }

        const deleteUser = await User.updateOne(
            { id: adminId },
            { isDeleted: true },
            { new: true, session },
        );

        if (!deleteUser) {
            throw new AppError(400, 'Failed to delete user!');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedAdmin;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
};

export const AdminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateAdminIntoDB,
    deleteAdminFromDB,
};
