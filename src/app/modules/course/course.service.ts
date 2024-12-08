import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./course.constant";
import { TCourse } from "./course.interface"
import { Course } from "./course.model"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);

    return result;
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(Course.find().populate("preRequisiteCourses.course"), query).search(searchableFields).filter().sort().paginate().fields();

    const result = await courseQuery.modelQuery;

    return result;
}

const getSingleCourseFromDB = async (courseId: string) => {
    const result = await Course.findById(courseId).populate("preRequisiteCourses.course");

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