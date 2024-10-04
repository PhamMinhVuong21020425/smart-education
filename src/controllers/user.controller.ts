import { NextFunction, Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import * as userService from '../services/user.service';
import { users, courseRecommends } from '../mock/data';
import { UserRole } from '../enums/UserRole';

export const getUserList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.render('users/index', { users });
  }
);

export const getInstructorList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const instructors = await userService.getInstructorList();
    res.render('instructors/list', {
      title: req.t('title.list_instructor'),
      instructors,
      currentPath: req.baseUrl + req.path,
    });
  }
);

export const getStudentList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const students = await userService.getStudentList();
    res.render('students/list', {
      title: req.t('title.list_student'),
      students,
      currentPath: req.baseUrl + req.path,
    });
  }
);

export const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return next(Error(req.t('error.userNotFound')));
    }

    res.render('users/detail', {
      title: req.t('title.user_detail'),
      courseRecommends,
      user,
      UserRole,
    });
  }
);

export const userCreateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.render('users/form', { title: 'Create user', UserRole });
  }
);

export const userCreatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('User is created with method POST');
  }
);

export const userDeleteGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = users.find(user => user.id === req.params.id);
    res.render('users/delete', { user });
  }
);

export const userDeletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`User ${req.params.id} is deleted with method POST`);
  }
);

export const userUpdateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = users.find(user => user.id === req.params.id);
    res.render('users/form', { title: 'Update user', user, UserRole });
  }
);

export const userUpdatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`User ${req.params.id} is updated with method POST`);
  }
);
