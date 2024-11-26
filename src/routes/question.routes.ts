import { Router, Response, NextFunction } from 'express';
import * as questionController from '../controllers/question.controller';
import { RequestForQuestion } from '../helpers/question.helper';
import { requireInstructor } from '../middleware/require-instructor.middleware';

const router: Router = Router();

router.use((req: RequestForQuestion, res: Response, next: NextFunction) => {
  req.courseID = req.baseUrl.split('/')[2];
  req.examID = req.baseUrl.split('/')[4];
  next();
});

router.use(requireInstructor);

router.get('/create', questionController.questionCreateGet);

router.post('/create', questionController.questionCreatePost);

router.get('/:id/delete', questionController.questionDeleteGet);

router.post('/:id/delete', questionController.questionDeletePost);

router.get('/:id/update', questionController.questionUpdateGet);

router.post('/:id/update', questionController.questionUpdatePost);

router.get('/:id', questionController.questionDetail);

router.get('/', questionController.questionList);

export default router;
