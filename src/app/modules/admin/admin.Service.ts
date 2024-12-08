import { Admin } from "./admin.model"

const getAllAdminFromDB = async () => {
    const result = await Admin.find();

    return result;
}

export const AdminServices = {
    getAllAdminFromDB,
}