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

const updateCourseIntoDB = async (courseId: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...remainingCourses } = payload;

    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(courseId, remainingCourses, { new: true, runValidators: true });

    // check if there is any pre requisite courses update
    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
        // filter out the deleted fields
        const deletedPreRequusites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map((el) => el.course)

        const deletedPreRequusitesCourses = await Course.findByIdAndUpdate(courseId,
            {
                $pull: { preRequisiteCourses: { course: { $in: deletedPreRequusites } } }
            }
        )


    }

    return updatedBasicCourseInfo;
}

const deleteCourseFromDB = async (courseId: string) => {
    const result = await Course.updateOne({ _id: courseId }, { isDeleted: true }, { new: true });

    return result;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
}