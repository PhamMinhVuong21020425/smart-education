import { NextFunction, Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { fullLessons } from '../mock/data';
import { RequestWithCourseID } from '../helpers/lesson.helper';

export const getLessonDetail = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const lessonDetail = fullLessons.find(
      lesson => lesson.id === req.params.lessonID
    );
    res.render('lessons/index', {
      fullLessons,
      lessonDetail,
      courseID: req.courseID,
    });
  }
);

export const lessonList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('lesson list');
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
