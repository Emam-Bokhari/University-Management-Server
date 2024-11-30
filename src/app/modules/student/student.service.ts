import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id });
  const result = Student.aggregate([
    //stage:1
    { $match: { id: id } },
  ]);
  return result;
};

const deleteStudent = async (id: string) => {
  const result = await Student.updateOne(
    { _id: id },
    { isDeleted: true },
  );
  return result;
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudent,
};
