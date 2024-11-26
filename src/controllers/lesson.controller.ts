import fs from 'fs';
import i18next from 'i18next';
import { NextFunction, Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createLesson,
  deleteLessonByLessonId,
  getLessonById,
  getLessonList,
  getStudentLessonByLessonId,
  markDoneLesson,
  updateLessonById,
} from '../services/lesson.service';
import { RequestWithCourseID } from '../helpers/lesson.helper';
import { getCourseById } from '../services/course.service';
import { getBestGradeByCourseId } from '../services/exam.service';
import {
  dateFromTimeAndDate,
  timeAndDateFromDateObject,
} from '../helpers/date.helper';

export const getLessonDetail = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const userSession = req.session.user;
    if (!userSession) {
      res.redirect('/auth/login');
      return;
    }
    const lessonList = await getLessonList(userSession.id, req.courseID!);
    const lessonDetail = lessonList.find(lesson => lesson.id === req.params.id);

    const grade = await getBestGradeByCourseId(req.courseID!, userSession.id);
    res.render('lessons/index', {
      title: req.t('title.lesson_detail'),
      lessonList,
      examStatus: grade?.status,
      lessonDetail,
      courseID: req.courseID,
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
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    res.render('lessons/form', {
      title: req.t('lesson.create'),
      courseID: req.courseID,
    });
  }
);

export const lessonCreatePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const courseId = req.courseID;
    const course = await getCourseById(courseId!);

    if (!course) {
      req.flash('error', i18next.t('error.courseNotFound'));
      res.redirect('/error');
      return;
    }

    const file_url = req.file ? req.file.path : '';

    const title = req.body.title;
    const content = req.body.content;
    const studyTime = req.body.studyTime;
    const studyDate = req.body.studyDate;
    const study_time = dateFromTimeAndDate(studyTime, studyDate);
    await createLesson(course, title, content, file_url, study_time);
    res.redirect(`/courses/${courseId}/manage#lesson`);
  }
);

export const lessonDeleteGet = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const lessonId = req.params.id;
    const studentLesson = await getStudentLessonByLessonId(lessonId);
    const lessonDetail = await getLessonById(lessonId);
    const { time, date } = timeAndDateFromDateObject(lessonDetail!.study_time);
    const lesson = { ...lessonDetail, time, date };
    res.render('lessons/delete', {
      courseID: req.courseID,
      studentLesson,
      lesson,
    });
  }
);

export const lessonDeletePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const lessonId = req.params.id;
    const courseId = req.courseID;
    await deleteLessonByLessonId(courseId!, lessonId);
    const prevFilePath = req.body.prevFilePath;
    if (fs.existsSync(prevFilePath)) {
      fs.unlinkSync(prevFilePath);
    }
    res.redirect(`/courses/${req.courseID}/manage#lesson`);
  }
);

export const lessonUpdateGet = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const currentLessonPage = parseInt(req.query.lessonPage as string) || 1;
    const lessonDetail = await getLessonById(req.params.id);
    if (!lessonDetail) {
      req.flash('error', i18next.t('error.lessonNotFound'));
      res.redirect('/error');
      return;
    }
    const { time, date } = timeAndDateFromDateObject(lessonDetail.study_time);
    const lesson = { ...lessonDetail, time, date };
    res.render('lessons/form', {
      title: req.t('lesson.edit'),
      courseID: req.courseID,
      lesson,
      currentLessonPage,
    });
  }
);

export const lessonUpdatePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const currentLessonPage = parseInt(req.query.lessonPage as string) || 1;
    const courseId = req.courseID;
    const lessonId = req.params.id;

    const course = await getCourseById(courseId!);
    if (!course) {
      req.flash('error', i18next.t('error.courseNotFound'));
      res.redirect('/error');
      return;
    }

    const prevFilePath = req.body.prevFilePath;
    let file_url = prevFilePath;
    if (req.file) {
      file_url = req.file.path;
      if (fs.existsSync(prevFilePath)) {
        fs.unlinkSync(prevFilePath);
      }
    }

    const title = req.body.title;
    const content = req.body.content;
    const studyTime = req.body.studyTime;
    const studyDate = req.body.studyDate;
    const study_time = dateFromTimeAndDate(studyTime, studyDate);

    await updateLessonById(
      lessonId,
      [course],
      title,
      content,
      file_url,
      study_time
    );
    res.redirect(
      `/courses/${courseId}/manage?lessonPage=${currentLessonPage}#lesson`
    );
  }
);

export const markDoneLessonPost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const userSession = req.session.user;
    if (!userSession) {
      res.redirect('/auth/login');
      return;
    }

    const lessonId = req.params.id;
    const response = await markDoneLesson(lessonId, userSession);
    if (!response) return;
    res.redirect(`${response.lesson.id}`);
  }
);
