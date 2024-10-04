import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import * as userService from '../services/user.service';
import { courseRecommends, courseLearns } from '../mock/data';

export const index = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const instructors = await userService.getInstructorList();
    const students = await userService.getStudentList();
    res.render('index', {
      title: 'Smart Education',
      courseRecommends,
      courseLearns,
      instructors,
      students,
      currentPath: req.baseUrl + req.path,
    });
  }
);
