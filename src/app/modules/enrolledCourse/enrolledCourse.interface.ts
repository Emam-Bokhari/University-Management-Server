import { Types } from "mongoose"

type TCourseMarks = {
    classTest1: number;
    midTerm: number;
    classTest2: number;
    finalTerm: number;
}

enum TGrade {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    NA = "NA"
}

export type TEnrolledCourse = {
    semesterRegistration: Types.ObjectId;
    academicSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    offeredCourse: Types.ObjectId;
    course: Types.ObjectId;
    student: Types.ObjectId;
    faculty: Types.ObjectId;
    isEnrolled: boolean;
    courseMarks: TCourseMarks;
    grade: TGrade;
    gradePoints: number;
    isCompleted: boolean;
}