import { Router } from 'express';
import * as courseController from '../controllers/course.controller';

const router: Router = Router();

router.get('/create', courseController.courseCreateGet);

router.post('/create', courseController.courseCreatePost);

router.get('/:id/delete', courseController.courseDeleteGet);

router.post('/:id/delete', courseController.courseDeletePost);

router.get('/:id/update', courseController.courseUpdateGet);

router.post('/:id/update', courseController.courseUpdatePost);

router.get('/:id/manage', courseController.courseManageGet);

router.get('/:id/enroll', courseController.courseEnrollGet);

router.get('/:enrollmentId/approve', courseController.approveEnrollGet);

router.get('/:enrollmentId/reject', courseController.rejectEnrollGet);

router.get('/:id', courseController.courseDetail);

router.get('/', courseController.courseList);

export default router;
