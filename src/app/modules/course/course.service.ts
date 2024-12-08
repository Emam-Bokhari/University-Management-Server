import { TCourse } from "./course.interface"
import { Course } from "./course.model"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);

    return result;
}

const getAllCoursesFromDB = async () => {
    const result = await Course.find();

    return result;
}

const getSingleCourseFromDB = async (courseId: string) => {
    const result = await Course.findById(courseId);

    return result;
}

const deleteCourseFromDB = async (courseId: string) => {
    const result = await Course.findByIdAndUpdate(courseId, { isDeleted: true }, { new: true });

    return result;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
}