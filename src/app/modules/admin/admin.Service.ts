import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model"

const getAllAdminFromDB = async () => {
    const result = await Admin.find();

    return result;
}

const getSingleAdminFromDB = async (adminId: string) => {
    const result = await Admin.findOne({ id: adminId })

    return result;
}

const updateAdminIntoDB = async (adminId: string, payload: Partial<TAdmin>) => {
    const result = await Admin.updateOne({ id: adminId }, payload, { new: true })

    return result;
}

export const AdminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateAdminIntoDB,
}