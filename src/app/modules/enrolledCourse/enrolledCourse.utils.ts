export const calculateAndGradePoints = (totalMarks: number) => {
  let result = {
    grade: 'NA',
    gradePoints: 0,
  };

  if (totalMarks >= 0 && totalMarks <= 19) {
    result = {
      grade: 'F',
      gradePoints: 0.0,
    };
  } else if (totalMarks >= 20 && totalMarks <= 39) {
    result = {
      grade: 'D',
      gradePoints: 2.0,
    };
  } else if (totalMarks >= 40 && totalMarks <= 59) {
    result = {
      grade: 'C',
      gradePoints: 3.0,
    };
  } else if (totalMarks >= 60 && totalMarks <= 79) {
    result = {
      grade: 'B',
      gradePoints: 3.5,
    };
  } else if (totalMarks >= 80 && totalMarks <= 100) {
    result = {
      grade: 'A',
      gradePoints: 4.0,
    };
  }

  return result;
};
