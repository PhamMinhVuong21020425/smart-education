import { Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import { RequestWithCourseID } from '../helpers/lesson.helper';
import * as forumService from '../services/forum.service';
import { getCourseById } from '../services/course.service';

export const forumList = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const course = await getCourseById(req.courseID!);
    const forums = await forumService.getForumsByCourseId(req.courseID!);
    res.render('forums/index', { title: req.t('title.forum'), course, forums });
  }
);

export const forumDetail = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const course = await getCourseById(req.courseID!);
    const forum = await forumService.getForumById(req.params.id);
    const comments = await forumService.getCommentsByForumId(req.params.id);
    res.render('forums/detail', {
      title: forum?.title,
      course,
      forum,
      comments,
    });
  }
);

export const forumCreatePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const course = await getCourseById(req.courseID!);
    if (!course) return;
    await forumService.createForum(course, req.body);
    res.redirect(`/courses/${req.courseID}/forums`);
  }
);

export const forumDeletePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    await forumService.deleteForum(req.params.id);
    res.redirect(`/courses/${req.courseID}/forums`);
  }
);

export const forumUpdatePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    await forumService.updateForum(req.params.id, req.body);
    res.redirect(`/courses/${req.courseID}/forums/${req.params.id}`);
  }
);

export const commentCreatePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    const userSession = req.session.user;
    const parentCommentId = req.query.parentCommentId as string | undefined;
    if (!userSession) return;
    const comment = await forumService.createComment(
      userSession,
      req.params.id,
      parentCommentId,
      req.body
    );
    res.redirect(
      `/courses/${req.courseID}/forums/${req.params.id}${comment.parent ? `#comment_${comment.parent.id}` : '#course_title'}`
    );
  }
);

export const commentUpdatePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    await forumService.updateComment(req.params.commentId, req.body);
    res.status(200).send();
  }
);

export const commentDeletePost = asyncHandler(
  async (req: RequestWithCourseID, res: Response, next: NextFunction) => {
    await forumService.deleteComment(req.params.commentId);
    res.status(200).send();
  }
);
