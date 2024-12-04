import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate("admissionSemester").populate({
    path: "academicDepartment",
    populate: ({
      path: "academicFaculty"
    })
  });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id });
  const result = await Student.aggregate([
    //stage:1
    { $match: { id: id } },
    //stage:2
    {
      $lookup: {
        from: "academicsemesters", // collection name
        localField: "admissionSemester", // field in the student model
        foreignField: "_id", // field in the admission semester
        as: "admissionSemester" // alias name of populated data
      }
    },
    //stage:3
    {
      $lookup: {
        from: "academicdepartments",
        localField: "academicDepartment",
        foreignField: "_id",
        as: "academicDepartment"
      }
    },
    //stage:4
    { $unwind: "$academicDepartment" },
    //stage:5
    {
      $lookup: {
        from: "academicfaculties",
        localField: "academicDepartment.academicFaculty",
        foreignField: "_id",
        as: "academicDepartment.academicFaculty"
      }
    }
  ])
  return result;
};

const deleteStudent = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudent,
};
