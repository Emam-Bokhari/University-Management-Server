import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {

  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate("academicFaculty");
  return result;
};

const getSingleAcademicDepartmentFromDB = async (
  academicDepartmentId: string,
) => {
  const result = await AcademicDepartment.findOne({
    _id: academicDepartmentId,
  }).populate("academicFaculty");
  return result;
};

const updateAcademicDepartmentInDB = async (
  academicDepartmentId: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: academicDepartmentId },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentInDB,
};
