import { Grade } from '../entity/grade.entity';
import { Question } from '../entity/question.entity';
import { Assignment } from '../entity/assignment.entity';
import { User } from '../entity/user.entity';
import { Answer } from '../entity/answer.entity';
import { Option } from '../entity/option.entity';
import { AppDataSource } from '../config/data-source';
import { formatDateTime } from '../helpers/date.helper';

const gradeRepository = AppDataSource.getRepository(Grade);
const questionRepository = AppDataSource.getRepository(Question);
const examRepository = AppDataSource.getRepository(Assignment);
const optionRepository = AppDataSource.getRepository(Option);
const answerRepository = AppDataSource.getRepository(Answer);

export const getExamGradeByCourseId = async (courseId: string) => {
  const grade = await gradeRepository.findOne({
    relations: ['assignment'],
    where: {
      assignment: {
        course: {
          id: courseId,
        },
      },
    },
  });
  if (!grade) return;
  (grade as any).assignment.deadline = formatDateTime(
    grade.assignment.deadline
  );
  return grade;
};

export const getExamById = async (examId: string) => {
  const exam = await examRepository.findOne({
    where: {
      id: examId,
    },
  });
  if (!exam) return;
  return exam;
};

export const getQuestionsByExamId = async (examId: string) => {
  const questions = await questionRepository.find({
    where: {
      assignment: {
        id: examId,
      },
    },
    relations: ['options', 'answers', 'assignment'],
  });
  if (!questions) return;
  return questions;
};

export const getQuestionById = async (questionId: string) => {
  const question = await questionRepository.findOne({
    where: {
      id: questionId,
    },
  });
  if (!question) return;
  return question;
};

export const getOptionById = async (optionId: string) => {
  const option = await optionRepository.findOne({
    where: {
      id: optionId,
    },
  });
  if (!option) return;
  return option;
};

export const createAnswersFromExam = async (
  question: Question,
  option: Option,
  user: User
) => {
  const existingAnswer = await answerRepository.findOne({
    where: {
      question: {
        id: question.id,
      },
      student: {
        id: user.id,
      },
    },
  });

  if (existingAnswer) {
    existingAnswer.option = option;
    return answerRepository.save(existingAnswer);
  } else {
    const answer = new Answer();
    answer.question = question;
    answer.option = option;
    answer.student = user;
    return answerRepository.save(answer);
  }
};

export const getResultOfExam = async (userId: string, examId: string) => {
  const answers = await answerRepository.find({
    where: {
      student: {
        id: userId,
      },
    },
    relations: ['option', 'question', 'question.options'],
  });
  const questions = await getQuestionsByExamId(examId);
  const questionIds = questions?.map(question => question.id);
  const filteredAnswers = answers.filter(answer => {
    return answer.question && questionIds?.includes(answer.question.id);
  });
  if (!filteredAnswers) return;
  const score = filteredAnswers.filter(
    answer => answer.option && answer.option.is_correct
  ).length;
  return { filteredAnswers, score };
};
