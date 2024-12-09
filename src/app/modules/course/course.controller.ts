import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CourseServices } from "./course.service";
import sendResponse from "../../utils/sendResponse";

const createCourse: RequestHandler = catchAsync(async (req, res) => {
    const courseData = req.body;
    const result = await CourseServices.createCourseIntoDB(courseData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Created course successfully",
        data: result,
    })
})

const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course are retrieved successfully",
        data: result,
    })
})

const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
    const courseId = req.params.courseId;
    const result = await CourseServices.getSingleCourseFromDB(courseId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course is retrieved successfully",
        data: result,
    })
})

const updateCourse: RequestHandler = catchAsync(async (req, res) => {
    const courseId = req.params.courseId;
    const updatedData = req.body;
    const result = await CourseServices.updateCourseIntoDB(courseId, updatedData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course is updated successfully!",
        data: result,
    })
})

const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
    const courseId = req.params.courseId;
    const result = await CourseServices.deleteCourseFromDB(courseId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course is deleted successfully",
        data: result,
    })
})

const assignCourseFaculties: RequestHandler = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await CourseServices.assignCourseFacultiesIntoDB(courseId, faculties);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Create Course faculties",
        data: result,
    })
})

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignCourseFaculties,
}