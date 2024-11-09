import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getExamById,
  getBestGradeByCourseId,
  updateGradeWhenStartExam,
  updateGradeWhenSubmitExam,
  getResultOfExam,
  createExam,
  updateExam,
  createAnswersFromExam,
  getResultOfExamByGradeId,
  updateGradeById,
} from '../services/exam.service';
import { getQuestionsByExamId } from '../services/question.service';
import { RequestWithCourseID } from '../helpers/lesson.helper';
import { validateUserCurrent } from './user.controller';
import { getUserById } from '../services/user.service';
import { getLessonList } from '../services/lesson.service';
import { AssignmentStatus } from '../enums';

export const examList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('exam list');
  }
);

export const getExamInfo = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const userSession = req.session.user!;
    const lessonList = await getLessonList(userSession.id, req.courseID!);
    const grade = await getBestGradeByCourseId(req.courseID!, userSession.id);
    res.render('lessons/index', {
      title: req.t('lesson.finalExam'),
      lessonList,
      examStatus: grade?.status,
      grade,
      courseID: req.courseID,
      message: req.query.message,
    });
  }
);

export const getExamDetail = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const userSession = req.session.user!;
    const questions = await getQuestionsByExamId(req.params.id);
    const exam = await getExamById(req.params.id);
    const grade = await updateGradeWhenStartExam(exam!, userSession);

    if (
      exam?.attempt_limit &&
      grade.attempt >= exam?.attempt_limit &&
      grade.status !== AssignmentStatus.TODO &&
      grade.status !== AssignmentStatus.DOING
    ) {
      // Render message that user has reached the limit of attempt
      res.redirect(`/courses/${req.courseID}/exam?message=true`);
      return;
    }

    res.render('exams/detail', {
      title: req.t('exam.doExam'),
      questions,
      exam,
      courseID: req.courseID,
      selectedAnswers: req.session.selectedAnswers || {},
      startTime: grade.start_time,
    });
  }
);

export const saveAnswer = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const { questionId, answerId } = req.body;

    if (!req.session.selectedAnswers) {
      req.session.selectedAnswers = {};
    }

    req.session.selectedAnswers[questionId] = answerId;

    res.json({ success: true, message: 'Answer saved' });
  }
);

export const examCreateGet = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    res.render('exams/form', {
      title: req.t('title.create_exam'),
      courseID: req.courseID,
    });
  }
);

export const examCreatePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    await createExam(req.body, req.courseID!);

    res.redirect(`/courses/${req.courseID}/manage#exam`);
  }
);

export const examDeleteGet = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    res.send(`exam ${req.params.id} is deleted with method GET`);
  }
);

export const examDeletePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    res.send(`exam ${req.params.id} is deleted with method POST`);
  }
);

export const examUpdateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`exam ${req.params.id} is updated with method GET `);
  }
);

export const examUpdatePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    await updateExam(req.params.id, req.body);

    res.redirect(`/courses/${req.courseID}/exam/${req.params.id}/manage`);
  }
);

export const examManageGet = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const exam = await getExamById(req.params.id);
    const questions = await getQuestionsByExamId(req.params.id);
    res.render('exams/manage', {
      title: req.t('title.manage_exam'),
      exam,
      questions,
      courseID: req.courseID!,
    });
  }
);

export const submitExam = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateUserCurrent(req, res, next);
    req.session.selectedAnswers = {};
    const questions = await getQuestionsByExamId(req.params.id);
    const answers = req.body as { [key: string]: string };
    const user = await getUserById(res.locals.user.id);
    await createAnswersFromExam(questions!, user!, answers);
    res.redirect(`${req.params.id}/result`);
  }
);

export const resultExam = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const userSession = req.session.user!;
    const gradeId = req.query.grade as string;
    if (gradeId) {
      const result = await getResultOfExamByGradeId(gradeId);
      const detailAnswers = result?.answers;
      const score = result?.score;
      const exam = result?.grade.assignment;
      const grade = result?.grade;
      res.render('exams/result', {
        title: req.t('exam.viewResult'),
        detailAnswers,
        score,
        exam,
        grade,
        courseID: req.courseID,
        gradeId,
      });
    } else {
      const exam = await getExamById(req.params.id);
      const result = await getResultOfExam(userSession.id, req.params.id);
      const detailAnswers = result?.filteredAnswers;
      const score = result?.score;
      const totalQuestions = result?.filteredAnswers.length;
      await updateGradeWhenSubmitExam(
        exam!,
        userSession,
        score,
        totalQuestions
      );

      res.render('exams/result', {
        title: req.t('exam.viewResult'),
        detailAnswers,
        score,
        exam,
        courseID: req.courseID,
      });
    }
  }
);

export const addFeedBackPost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const gradeId = req.query.grade as string;
    const courseId = req.courseID;
    const feedback = req.body.feedback;
    await updateGradeById(gradeId, feedback);
    res.redirect(`/courses/${courseId}/manage#grade`);
  }
);
