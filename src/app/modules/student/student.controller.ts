import { Request, Response } from 'express';
import { StudentServices } from './student.service';


const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    // const studentId=req.params.studentId;
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudent(studentId)
    res.status(200).json({
      success: true,
      message: "Student is deleted successfully",
      data: result,
    })

  } catch (err: any) {
    // console.log(err)
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
      error: err,
    })
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
