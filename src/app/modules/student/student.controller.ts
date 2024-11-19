import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validator';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // validate incoming request data
    const { error, value } = studentValidationSchema.validate(studentData);

    // handle validation error
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details,
      });
    }

    // if validation passes, create a student in database
    const result = await StudentServices.createStudentIntoDB(value);

    // successfull response
    res.status(201).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);

    // general error message
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err,
    });
  }
};

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
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Student not found with the given ID',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
