import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
}

const getSingleAcademicSemesterFromDB = async (academicSemesterId: string) => {
  const result = await AcademicSemester.findOne({ id: academicSemesterId })
  return result;
}

const updateAcademicSemesterInDB = async (id: string, payload: Partial<TAcademicSemester>) => {
  if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code!")
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, { new: true })
  return result;
}

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterInDB,
};
