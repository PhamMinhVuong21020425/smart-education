import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import i18next from 'i18next';
import * as courseService from '../services/course.service';
import { Course } from '../entity/course.entity';
import { CourseLevel } from '../enums/CourseLevel';
import * as lessonService from '../services/lesson.service';
import { CourseWithEnrollStatus } from '../helpers/course.helper';
import { UserRole } from '../enums/UserRole';
import { LIMIT_RECORDS } from '../constants';

export const courseList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allCourses = await courseService.getCourseList();

    let myCourses: CourseWithEnrollStatus[] = [];
    if (req.session.user) {
      myCourses = await courseService.getUserCourseList(req.session.user);
    }
    const courseRecommends = allCourses.filter(
      course => !myCourses.find(myCourse => myCourse.id === course.id)
    );
    res.render('courses/index', {
      title: req.t('title.list_course'),
      courseRecommends,
      myCourses,
      currentPath: req.baseUrl,
    });
  }
);

async function validateCourse(
  req: Request,
  res: Response
): Promise<Course | null> {
  const courseId = req.params.id;
  if (!courseId) {
    const errorMessageId = i18next.t('error.invalidId');
    res.status(404).send(errorMessageId);
    return null;
  }

  const course = await courseService.getCourseDetails(courseId);
  if (course === null) {
    req.flash('error', i18next.t('error.courseNotFound'));
    res.redirect('/error');
    return null;
  }

  return course;
}

// Hiển thị trang chi tiết của một khóa học cụ thể.
export const courseDetail = async (req: Request, res: Response) => {
  const course = await validateCourse(req, res);
  if (course === null) return;

  // Đếm số lượng sinh viên đã đăng ký khóa học
  const studentCount = await courseService.getStudentCountByCourseId(course.id);

  // Lấy danh sách bài học của khóa học
  const lessons = await lessonService.getLessonsByCourseId(course.id);

  // Kiểm tra xem người dùng đã đăng ký khóa học chưa
  const enrollment = await courseService.getEnrollment(
    course,
    req.session.user
  );

  try {
    res.render('courses/detail', {
      title: req.t('title.course_detail'),
      course,
      CourseLevel,
      lessons,
      studentCount,
      enrollment,
    });
  } catch (error) {
    req.flash('error', i18next.t('error.failedToRetrieveCourseDetails'));
    res.redirect('/error');
  }
};

export const courseEnrollGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
      const course = await validateCourse(req, res);
      if (course === null) return;
      const user = req.session.user;
      await courseService.enrollCourse(course, user);
      return res.redirect(`/courses/${course.id}`);
    }
    return res.redirect('/auth/login');
  }
);

export const approveEnrollGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { enrollmentId } = req.params;
    const userSession = req.session.user;
    if (userSession && userSession.role === UserRole.INSTRUCTOR) {
      await courseService.approveEnrollment(enrollmentId);
      return res.redirect('back');
    }
    return res.redirect('/auth/login');
  }
);

export const rejectEnrollGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { enrollmentId } = req.params;
    const userSession = req.session.user;
    if (userSession && userSession.role === UserRole.INSTRUCTOR) {
      await courseService.rejectEnrollment(enrollmentId);
      return res.redirect('back');
    }
    return res.redirect('/auth/login');
  }
);

export const courseManageGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentLessonPage = parseInt(req.query.lessonPage as string) || 1;
    const userSession = req.session.user;
    const course = await validateCourse(req, res);
    if (!course) return;
    if (
      (userSession && course.instructor.id === userSession.id) ||
      (userSession && course.subInstructor?.id === userSession.id)
    ) {
      const enrollments = await courseService.getEnrollmentForCourse(course);
      const lessons = await lessonService.getLessonListAdmin(course.id);
      const totalLessonPages = Math.ceil(lessons.length / LIMIT_RECORDS);

      currentLessonPage;
      res.render('courses/manage', {
        title: req.t('title.course_detail'),
        course,
        enrollments,
        lessons: lessons.slice(
          (currentLessonPage - 1) * LIMIT_RECORDS,
          currentLessonPage * LIMIT_RECORDS
        ),
        currentLessonPage,
        totalLessonPages,
        LIMIT_RECORDS,
      });
    } else {
      req.flash('error', i18next.t('error.permissionDenied'));
      res.redirect('/error');
    }
  }
);

export const courseCreateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('course is created with method GET');
  }
);

export const courseCreatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('course is created with method POST');
  }
);

export const courseDeleteGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`course ${req.params.id} is deleted with method GET`);
  }
);

export const courseDeletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`course ${req.params.id} is deleted with method POST`);
  }
);

export const courseUpdateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`course ${req.params.id} is updated with method GET `);
  }
);

export const courseUpdatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`course ${req.params.id} is updated with method POST`);
  }
);
