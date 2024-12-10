import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface"
import { Course, CourseFaculty } from "./course.model"
import AppError from "../../errors/AppError";

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

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // transaction: 1
        const updatedBasicCourseInfo = await Course.findByIdAndUpdate(courseId, remainingCourses, { new: true, runValidators: true, session });

        if (!updatedBasicCourseInfo) {
            throw new AppError(400, "Failed to update course!");
        }

        // transaction: 2
        // check if there is any pre requisite courses update
        if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
            // filter out the deleted fields
            const deletedPreRequusites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map((el) => el.course)

            const deletedPreRequusitesCourses = await Course.findByIdAndUpdate(courseId,
                {
                    $pull: { preRequisiteCourses: { course: { $in: deletedPreRequusites } } }
                },
                { new: true, runValidators: true, session }
            )

            if (!deletedPreRequusitesCourses) {
                throw new AppError(400, "Failed to update course!")
            }

            // transaction: 3
            // filter out the new course fields
            const newPreRequsites = preRequisiteCourses?.filter((el) => el.course && !el.isDeleted)

            const newPreRequsitesCourses = await Course.findByIdAndUpdate(courseId, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequsites } }
            }, { new: true, runValidators: true, session })

            if (!newPreRequsitesCourses) {
                throw new AppError(400, "Failed to update course!")
            }

        }

        const result = await Course.findById(courseId).populate("preRequisiteCourses.course")

        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession()
        throw err;
    }

}

const deleteCourseFromDB = async (courseId: string) => {
    const result = await Course.updateOne({ _id: courseId }, { isDeleted: true }, { new: true });

    return result;
}

const assignCourseFacultiesIntoDB = async (courseId: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(courseId, { course: courseId, $addToSet: { faculties: { $each: payload } } }, { upsert: true, new: true })


    return result;
}

const deleteCourseFacultiesFromDB = async (courseId: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(courseId, { $pull: { $in: payload } })

    return result;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignCourseFacultiesIntoDB,
    deleteCourseFacultiesFromDB,
}