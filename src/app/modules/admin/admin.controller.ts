import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AdminServices } from "./admin.Service";
import sendResponse from "../../utils/sendResponse";

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
    const result = await AdminServices.getAllAdminFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin are retrieved successfully",
        data: result,
    })
})

const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
    const adminId = req.params.adminId;
    const result = await AdminServices.getSingleAdminFromDB(adminId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin is retrieved successfully",
        data: result,
    })
})

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
    const adminId = req.params.adminId;
    const updatedData = req.body.admin;

    const result = await AdminServices.updateAdminIntoDB(adminId, updatedData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin is updated successfully",
        data: result,
    })
})

const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
    const adminId = req.params.adminId;
    const result = await AdminServices.deleteAdminFromDB(adminId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin is deleted successfully",
        data: result,
    })
})

export const AdminControllers = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
}