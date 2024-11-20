import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {

  const student = new Student(studentData)
  if (await student.isUserExists(studentData.id)) {
    throw new Error("User already exists.")
  }
  const result = await student.save()
  // const result = await Student.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
  const result = await Student.find({ id: studentId });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
