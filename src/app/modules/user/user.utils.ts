import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// 2030 01 0001

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString().padStart(4, '0');

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

const findLastFacultyId = async () => {
  const lastFacultyId = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFacultyId?.id ? lastFacultyId?.id : null;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString().padStart(4, '0'); // Default value

  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    // Remove the "F-" prefix and get the number
    const currentIdNumber = lastFacultyId.substring(2);
    currentId = (parseInt(currentIdNumber) + 1).toString().padStart(4, '0');
  }

  // Return the new faculty ID with "f-" prefix
  return `F-${currentId}`;
};
