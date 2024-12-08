import { Admin } from "./admin.model"

const getAllAdminFromDB = async () => {
    const result = await Admin.find();

    return result;
}

const getSingleAdminFromDB = async (adminId: string) => {
    const result = await Admin.findOne({ id: adminId })

    return result;
}

export const AdminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
}