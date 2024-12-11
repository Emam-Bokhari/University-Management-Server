import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already "UPCOMING"/"ONGOING" 
  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [
      { status: "UPCOMING" },
      { status: "ONGOING" }
    ]
  });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(400, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester.`)
  }

  // check if the  academic semester is exists
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(404, 'This academic semester is not found!');
  }

  // check semester exist
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester: academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(409, 'This semester is already registered!');
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};

const getSingleSemesterRegistrationFromDB = async (
  semesterRegistrationId: string,
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistrationId);
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, "Semester registration not found with the provided ID.")
  }
  const result = await SemesterRegistration.findById(
    semesterRegistrationId,
  ).populate('academicSemester');

  return result;
};

const updateSemesterRegistrationIntoDB = async (semesterRegistrationId: string, payload: Partial<TSemesterRegistration>) => {

  const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistrationId);

  if (!isSemesterRegistrationExists) {
    throw new AppError(404, "This semester is not exists!")
  }

  const currentSemesterStatus = isSemesterRegistrationExists?.status;

  if (currentSemesterStatus === "ENDED") {
    throw new AppError(400, "This semester is already ENDED")
  }
}

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
};
