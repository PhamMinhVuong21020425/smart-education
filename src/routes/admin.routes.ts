import express from 'express';
import * as adminController from '../controllers/admin.controller';
import { requireAdmin } from '../middleware/requireAdmin';
import upload from '../config/multer-config';

const router = express.Router();

router.use(requireAdmin);

router.get('/', adminController.getDashboard);

router.get('/pending-instructors', adminController.showPendingInstructors);

router.post('/approve/:id', adminController.approveInstructorController);

router.post('/reject/:id', adminController.rejectInstructorController);

router.get(
  '/instructor-pending/:id',
  adminController.getInstructorDetailsPending
);

router.get('/list-instructors', adminController.showInstructors);

router.get('/list-students', adminController.showStudents);

router.get('/list-courses', adminController.showCourses);

router.get('/instructor-detail/:id', adminController.getInstructorDetails);

router.get('/student-detail/:id', adminController.getStudentDetails);

router.post('/users/:id/activate', adminController.activateUser);

router.post('/users/:id/deactivate', adminController.deactivateUser);

router.get('/instructors/:id/edit', adminController.instructorUpdateGet);

router.post(
  '/instructors/:id/edit',
  upload.single('avatar'),
  adminController.instructorUpdatePost
);

export default router;
