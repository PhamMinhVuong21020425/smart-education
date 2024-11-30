import { Router, Response, NextFunction } from 'express';
import { RequestWithCourseID } from '../helpers/lesson.helper';
import { requireUser } from '../middleware/require-user.middleware';
import { requireInstructor } from '../middleware/require-instructor.middleware';
import * as forumController from '../controllers/forum.controller';

const router: Router = Router();

router.use((req: RequestWithCourseID, res: Response, next: NextFunction) => {
  req.courseID = req.baseUrl.split('/')[2];
  next();
});

router.use(requireUser);

router.post('/create', requireInstructor, forumController.forumCreatePost);

router.post('/:id/update', requireInstructor, forumController.forumUpdatePost);

router.post('/:id/comments/create', forumController.commentCreatePost);

router.post(
  '/:id/comments/:commentId/update',
  forumController.commentUpdatePost
);

router.post(
  '/:id/comments/:commentId/delete',
  forumController.commentDeletePost
);

router.get('/:id', forumController.forumDetail);

router.get('/', forumController.forumList);

export default router;
