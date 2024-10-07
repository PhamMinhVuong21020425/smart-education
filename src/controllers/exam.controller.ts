import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createAnswersFromExam,
  getExamById,
  getExamGradeByCourseId,
  getOptionById,
  getQuestionById,
  getQuestionsByExamId,
  getResultOfExam,
} from '../services/exam.service';
import { RequestWithCourseID } from '../helpers/lesson.helper';
import { validateUserCurrent } from './user.controller';
import { Answer } from '../entity/answer.entity';
import { getUserById } from '../services/user.service';

export const examList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('exam list');
  }
);

export const getExamInfo = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const grade = await getExamGradeByCourseId(req.courseID!);
    res.render('exams/index', { grade });
  }
);

export const getExamDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const questions = await getQuestionsByExamId(req.params.id);
    const exam = await getExamById(req.params.id);
    res.render('exams/detail', { questions, exam });
  }
);

export const examCreateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('exam is created with method GET');
  }
);

export const examCreatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('exam is created with method POST');
  }
);

export const examDeleteGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`exam ${req.params.id} is deleted with method GET`);
  }
);

export const examDeletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`exam ${req.params.id} is deleted with method POST`);
  }
);

export const examUpdateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`exam ${req.params.id} is updated with method GET `);
  }
);

export const examUpdatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`exam ${req.params.id} is updated with method POST`);
  }
);

export const submitExam = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateUserCurrent(req, res, next);
    const answers = req.body;
    for (const key in answers) {
      const question = await getQuestionById(key);
      const option = await getOptionById(answers[key]);
      const user = await getUserById(res.locals.user.id);
      await createAnswersFromExam(question!, option!, user!);
    }
    res.redirect(`${req.params.id}/result`);
  }
);

export const resultExam = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateUserCurrent(req, res, next);
    const exam = await getExamById(req.params.id);
    const result = await getResultOfExam(res.locals.user.id, req.params.id);
    const detailAnswers = result?.filteredAnswers;
    const score = result?.score;
    res.render('exams/result', { detailAnswers, score, exam });
  }
);
