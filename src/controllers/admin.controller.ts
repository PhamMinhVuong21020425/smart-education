import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import * as userService from '../services/user.service';
import * as adminService from '../services/admin.service';
import * as courseService from '../services/course.service';
import i18next from 'i18next';
import cloudinary from '../config/cloudinary-config';
import fs from 'fs';

export const getDashboard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;
    const statsData = await adminService.getStatistics();
    res.render('admin/stats', {
      user,
      statistics: statsData,
    });
  }
);

export const showPendingInstructors = asyncHandler(
  async (req: Request, res: Response) => {
    const pendingInstructors = await adminService.getPendingInstructors();
    res.render('admin/pending-instructors', {
      pendingInstructors,
    });
  }
);

export const approveInstructorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  await adminService.approveInstructor(userId);
  req.flash('success', i18next.t('success.instructor_approved'));
  res.redirect('/admin/pending-instructors');
};

export const rejectInstructorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  await adminService.rejectInstructor(userId);
  req.flash('success', i18next.t('success.instructor_rejected'));
  res.redirect('/admin/pending-instructors');
};

export const getInstructorDetailsPending = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const instructor = await adminService.getInstructorDetails(userId);
  res.render('admin/instructor-detail-pending', { instructor });
};

export const getInstructorDetails = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const instructor = await userService.getUserById(userId);
  if (!instructor) {
    res.status(404).send(i18next.t('error.instructor_not_found'));
    return;
  }
  const managedCourses = await courseService.getUserCourseList(instructor);

  res.render('admin/instructor-detail', {
    instructor,
    userCourses: managedCourses || [],
  });
};

export const instructorUpdateGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const instructorId = req.params.id;
  const instructor = await userService.getUserById(instructorId);
  if (!instructor) {
    req.flash('error', i18next.t('error.instructor_not_found'));
    return res.redirect('/admin/list-instructors');
  }
  res.render('admin/update-instructor', {
    title: 'Edit Instructor',
    instructor,
  });
};

export const instructorUpdatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Xử lý tải lên ảnh đại diện
  let avatarUrl = req.body.avatar_url || '';
  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'avatars',
    });
    avatarUrl = result.secure_url;
    fs.unlinkSync(req.file.path); // Xóa file tạm sau khi upload thành công
  }

  // Lấy dữ liệu từ body để cập nhật
  const updateData = {
    name: req.body.name,
    email: req.body.email,
    about: req.body.about,
    specialization: req.body.specialization,
    phone: req.body.phone,
    avatar_url: avatarUrl,
  };

  // Cập nhật thông tin giảng viên
  const updatedInstructor = await userService.updateUser(
    req.params.id,
    updateData
  );

  if (!updatedInstructor) {
    req.flash('error', i18next.t('error.instructor_not_found'));
    return res.redirect(`/admin/instructors/${req.params.id}/edit`);
  }

  req.flash('success', i18next.t('success.instructor_updated'));
  res.redirect(`/admin/instructor-detail/${req.params.id}`);
};

export const deleteInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const instructorId = req.params.id;

  // Tìm giảng viên theo ID
  const instructor = await userService.getUserById(instructorId);
  if (!instructor) {
    req.flash('error', i18next.t('error.instructor_not_found'));
    return res.redirect('/admin/list-instructors');
  }

  // Tìm các khóa học của giảng viên
  const courses = await courseService.findCoursesByInstructorId(instructorId);

  if (courses.length > 0) {
    // Kiểm tra từng khóa học để quyết định xem có người đăng ký không
    let hasEnrollments = false;
    for (const course of courses) {
      if (course.enrollments.length > 0) {
        hasEnrollments = true;
        break;
      }
    }

    if (hasEnrollments) {
      req.flash(
        'error',
        i18next.t('error.cannot_delete_instructor_with_enrollments')
      );
      return res.redirect('/admin/list-instructors');
    } else {
      // Xóa tất cả các khóa học của giảng viên nếu không có người đăng ký
      await courseService.deleteCoursesByInstructorId(instructorId);
    }
  }
  await userService.deleteById(instructorId);

  req.flash('success', i18next.t('success.instructor_deleted'));
  res.redirect('/admin/list-instructors');
};

export const showInstructors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const searchQuery = req.query.search?.toString() || '';
  const instructors = await adminService.searchInstructors(searchQuery);

  res.render('admin/list-instructors', {
    instructors,
    searchQuery,
  });
};
