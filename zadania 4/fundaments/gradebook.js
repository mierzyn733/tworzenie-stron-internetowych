function getAverage(scores) {
  const sum = scores.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / scores.length).toFixed(1));
}


function getGrade(score) {
  if (score === 100) return "A+";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}


function hasPassingGrade(grade) {
  return grade !== "F";
}


function studentMsg(classScores, studentScore) {
  const average = getAverage(classScores);
  const grade = getGrade(studentScore);
  const passed = hasPassingGrade(grade);
  const status = passed ? "passed" : "failed";
  return `Class average: ${average}. Your grade: ${grade}. You ${status} the course.`;
}