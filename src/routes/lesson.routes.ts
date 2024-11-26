import { Router, Response, NextFunction } from 'express';
import upload from '../config/upload-config';

import * as lessonController from '../controllers/lesson.controller';
import { RequestWithCourseID } from '../helpers/lesson.helper';
import { requireInstructor } from '../middleware/require-instructor.middleware';

const router: Router = Router();

router.use((req: RequestWithCourseID, res: Response, next: NextFunction) => {
  req.courseID = req.baseUrl.split('/')[2];
  next();
});

router.get('/create', requireInstructor, lessonController.lessonCreateGet);

router.post(
  '/create',
  requireInstructor,
  upload.single('file'),
  lessonController.lessonCreatePost
);

router.get('/:id/delete', requireInstructor, lessonController.lessonDeleteGet);

router.post(
  '/:id/delete',
  requireInstructor,
  lessonController.lessonDeletePost
);

router.get('/:id/update', requireInstructor, lessonController.lessonUpdateGet);

router.post(
  '/:id/update',
  requireInstructor,
  upload.single('file'),
  lessonController.lessonUpdatePost
);

router.get('/:id', lessonController.getLessonDetail);

router.post('/:id', lessonController.markDoneLessonPost);

router.get('/', lessonController.lessonList);

export default router;
