import { NextFunction, Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { getLessonList, markDoneLesson } from '../services/lesson.service';
import { RequestWithCourseID } from '../helpers/lesson.helper';
import { getCourseById } from '../services/course.service';
import { getBestGradeByCourseId } from '../services/exam.service';

export const getLessonDetail = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const userSession = req.session.user;
    if (!userSession) {
      res.redirect('/auth/login');
      return;
    }
    const lessonList = await getLessonList(userSession.id, req.courseID!);
    const lessonDetail = lessonList.find(lesson => lesson.id === req.params.id);
    const studentLesson = lessonDetail?.studentLessons.find(
      studentLesson => studentLesson.student.id === userSession.id
    );
    const grade = await getBestGradeByCourseId(req.courseID!, userSession.id);
    res.render('lessons/index', {
      title: req.t('title.lesson_detail'),
      lessonList,
      examStatus: grade?.status,
      lessonDetail,
      courseID: req.courseID,
      studentLessonId: studentLesson?.id,
    });
  }
);

export const lessonList = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const userSession = req.session.user;
    if (!userSession) {
      res.redirect('/auth/login');
      return;
    }
    const lessonList = await getLessonList(userSession.id, req.courseID!);
    const courseDetail = await getCourseById(req.courseID!);
    const grade = await getBestGradeByCourseId(req.courseID!, userSession.id);
    res.render('lessons/index', {
      title: req.t('title.list_lesson'),
      lessonList,
      examStatus: grade?.status,
      courseDetail,
      courseID: req.courseID,
    });
  }
);

export const lessonCreateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('lesson is created with method GET');
  }
);

export const lessonCreatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('lesson is created with method POST');
  }
);

export const lessonDeleteGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`lesson ${req.params.id} is deleted with method GET`);
  }
);

export const lessonDeletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`lesson ${req.params.id} is deleted with method POST`);
  }
);

export const lessonUpdateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`lesson ${req.params.id} is updated with method GET `);
  }
);

export const lessonUpdatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`lesson ${req.params.id} is updated with method POST`);
  }
);

export const markDoneLessonPost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const studentLessonId = req.body.studentLessonId;
    const response = await markDoneLesson(studentLessonId);
    console.log(req.session.user);
    if (!response) return;
    res.redirect(`${response.lesson.id}`);
  }
);
