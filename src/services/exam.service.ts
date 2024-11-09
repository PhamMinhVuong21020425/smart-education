import { Grade } from '../entity/grade.entity';
import { Question } from '../entity/question.entity';
import { Assignment } from '../entity/assignment.entity';
import { User } from '../entity/user.entity';
import { Answer } from '../entity/answer.entity';
import { AppDataSource } from '../config/data-source';
import { AssignmentStatus } from '../enums/AssignmentStatus';
import { RATE_PASS } from '../constants';
import { Course } from '../entity/course.entity';
import { getOptionById } from './question.service';
import { getUserById } from './user.service';

const examRepository = AppDataSource.getRepository(Assignment);
const gradeRepository = AppDataSource.getRepository(Grade);
const answerRepository = AppDataSource.getRepository(Answer);

export const getExamById = async (examId: string) => {
  const exam = await examRepository.findOne({
    relations: ['course'],
    where: {
      id: examId,
    },
  });
  if (!exam) return;
  return exam;
};

export const getGradesByCourseId = async (
  courseId: string,
  studentId: string
) => {
  const grades = await gradeRepository.find({
    relations: ['assignment'],
    where: {
      assignment: {
        course: {
          id: courseId,
        },
      },
      student: {
        id: studentId,
      },
    },
  });

  if (grades.length === 0) {
    const student = await getUserById(studentId);
    const exam = await getExamByCourseId(courseId);

    if (!student || !exam) return [];

    const newGrade = new Grade({
      student: student,
      assignment: exam,
      attempt: 1,
      start_time: new Date(),
      status: AssignmentStatus.TODO,
      grade: 0,
      max_grade: exam.questions.length,
    });

    return [newGrade];
  }

  return grades;
};

export const getBestGradeByCourseId = async (
  courseId: string,
  studentId: string
) => {
  const grades = await getGradesByCourseId(courseId, studentId);

  const bestGrade = grades.find(grade => {
    return grade.grade === Math.max(...grades.map(g => g.grade));
  });

  return bestGrade;
};

export const updateGradeWhenStartExam = async (
  exam: Assignment,
  student: User
) => {
  const grades = await getGradesByCourseId(exam.course.id, student.id);
  let lastAttempt = 1;
  let lastGrade = grades[0];
  for (const grade of grades) {
    if (grade.attempt > lastAttempt) {
      lastAttempt = grade.attempt;
      lastGrade = grade;
    }
  }

  if (
    exam.attempt_limit > 0 &&
    lastAttempt >= exam.attempt_limit &&
    lastGrade.status !== AssignmentStatus.TODO &&
    lastGrade.status !== AssignmentStatus.DOING
  ) {
    return lastGrade;
  }

  if (grades.length === 1 && grades[0].status === AssignmentStatus.TODO) {
    grades[0].start_time = new Date();
    grades[0].status = AssignmentStatus.DOING;
    return gradeRepository.save(grades[0]);
  } else if (lastGrade.status !== AssignmentStatus.DOING) {
    const newGrade = new Grade({
      student,
      assignment: exam,
      attempt: lastAttempt + 1,
      start_time: new Date(),
      status: AssignmentStatus.DOING,
      grade: 0,
      max_grade: grades[0].max_grade,
    });
    return gradeRepository.save(newGrade);
  }

  return lastGrade;
};

export const updateGradeWhenSubmitExam = async (
  exam: Assignment,
  student: User,
  grade: number,
  max_grade: number,
  feedback?: string
) => {
  const grades = await getGradesByCourseId(exam.course.id, student.id);
  let lastAttempt = grades[0].attempt;
  let lastGrade = grades[0];
  for (const grade of grades) {
    if (grade.attempt > lastAttempt) {
      lastAttempt = grade.attempt;
      lastGrade = grade;
    }
  }
  lastGrade.submit_time = new Date();
  lastGrade.grade = grade;
  lastGrade.max_grade = max_grade;
  lastGrade.feedback = feedback || '';
  if (grade / max_grade >= RATE_PASS) {
    lastGrade.status = AssignmentStatus.PASS;
  } else {
    lastGrade.status = AssignmentStatus.FAIL;
  }

  return gradeRepository.save(lastGrade);
};

export const createAnswersFromExam = async (
  questions: Question[],
  user: User,
  answers: Record<string, string>
) => {
  let attempt = 1;

  const existingAnswers = await answerRepository.find({
    where: {
      question: {
        id: questions[0].id,
      },
      student: {
        id: user.id,
      },
    },
  });

  for (const answer of existingAnswers) {
    if (answer.attempt >= attempt) {
      attempt = answer.attempt + 1;
    }
  }

  const promises: Promise<Answer>[] = [];
  for (const question of questions) {
    const optionId = answers[question.id];
    const answer = new Answer({
      student: user,
      question,
      attempt,
    });
    if (optionId) {
      const option = await getOptionById(optionId);
      answer.option = option!;
    }

    promises.push(answerRepository.save(answer));
  }

  return Promise.all(promises);
};

export const getResultOfExam = async (userId: string, examId: string) => {
  const answers = await answerRepository.find({
    where: {
      student: {
        id: userId,
      },
      question: {
        assignment: {
          id: examId,
        },
      },
    },
    relations: [
      'option',
      'question',
      'question.options',
      'question.assignment',
    ],
    order: {
      question: {
        created_at: 'ASC',
      },
    },
  });

  let lastAttempt = 1;
  for (const answer of answers) {
    if (answer.attempt > lastAttempt) {
      lastAttempt = answer.attempt;
    }
  }

  const filteredAnswers = answers.filter(answer => {
    return answer.attempt === lastAttempt;
  });

  const score = filteredAnswers.filter(
    answer => answer.option && answer.option.is_correct
  ).length;

  return { filteredAnswers, score };
};

export const getAllUserGradesByCourseId = async (courseId: string) => {
  const grades = await gradeRepository.find({
    relations: ['assignment', 'student'],
    where: {
      assignment: {
        course: {
          id: courseId,
        },
      },
    },
  });
  return grades;
};

export const getGradeById = async (gradeId: string) => {
  const grade = await gradeRepository.findOne({
    relations: ['assignment', 'student'],
    where: {
      id: gradeId,
    },
  });

  return grade;
};

export const getResultOfExamByGradeId = async (gradeId: string) => {
  const grade = await getGradeById(gradeId);
  if (!grade) return;
  const answers = await answerRepository.find({
    where: {
      student: {
        id: grade.student.id,
      },
      question: {
        assignment: {
          id: grade.assignment.id,
        },
      },
      attempt: grade.attempt,
    },
    relations: [
      'option',
      'question',
      'question.options',
      'question.assignment',
    ],
    order: {
      question: {
        created_at: 'ASC',
      },
    },
  });

  const score = answers.filter(
    answer => answer.option && answer.option.is_correct
  ).length;
  return { grade, answers, score };
};

export const updateGradeById = async (
  gradeId: string,
  feedback?: string,
  assignment?: Assignment,
  student?: User,
  status?: AssignmentStatus,
  grade?: number,
  max_grade?: number,
  start_time?: Date,
  submit_time?: Date,
  attempt?: number
) => {
  const gradeObject = await getGradeById(gradeId);
  if (!gradeObject) return;
  const gradeUpdate = new Grade({
    assignment,
    student,
    status,
    grade,
    max_grade,
    feedback,
    start_time,
    submit_time,
    attempt,
  });
  Object.assign(gradeObject, gradeUpdate);
  return await gradeRepository.save(gradeObject);
};

export const getExamByCourseId = async (courseId: string) => {
  const exam = await examRepository.findOne({
    where: {
      course: {
        id: courseId,
      },
    },
    relations: ['course', 'questions'],
  });
  return exam;
};

export const createExam = async (
  attribute: Record<string, string>,
  courseId: string
) => {
  const { name, description, deadline, timeLimit, attemptLimit } = attribute;
  const course = await AppDataSource.getRepository(Course).findOne({
    where: {
      id: courseId,
    },
  });
  if (!course) return;
  const exam = new Assignment({
    name,
    description,
    deadline: new Date(deadline),
    time_limit: Number(timeLimit),
    attempt_limit: Number(attemptLimit),
    course,
  });
  return examRepository.save(exam);
};

export const updateExam = async (
  examId: string,
  attribute: Record<string, string>
) => {
  const exam = await getExamById(examId);
  if (!exam) return;
  const { name, description, deadline, timeLimit, attemptLimit } = attribute;
  exam.name = name;
  exam.description = description;
  exam.deadline = new Date(deadline);
  exam.time_limit = Number(timeLimit);
  exam.attempt_limit = Number(attemptLimit);
  return examRepository.save(exam);
};
