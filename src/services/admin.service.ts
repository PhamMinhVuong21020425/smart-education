import sendEmail, { mailOptionsTemplate } from '../config/nodemailer-config';
import { AppDataSource } from '../config/data-source';
import { Course } from '../entity/course.entity';
import { User } from '../entity/user.entity';
import { UserRole } from '../enums/UserRole';

const courseRepository = AppDataSource.getRepository(Course);
const userRepository = AppDataSource.getRepository(User);

export const getStatistics = async () => {
  // Thống kê số lượng khóa học
  const totalCourses = await courseRepository.count();

  // Thống kê số lượng giảng viên
  const totalInstructors = await userRepository.count({
    where: {
      role: UserRole.INSTRUCTOR, // Sử dụng enum UserRole
    },
  });

  // Thống kê số lượng giảng viên đang chờ phê duyệt
  const pendingInstructors = await userRepository.count({
    where: {
      role: UserRole.PENDING_APPROVAL,
    },
  });

  return {
    totalCourses,
    totalInstructors,
    pendingInstructors,
  };
};

// Lấy danh sách giảng viên đang chờ phê duyệt
export const getPendingInstructors = async () => {
  const pendingInstructors = await userRepository.find({
    where: {
      role: UserRole.PENDING_APPROVAL,
    },
  });

  return pendingInstructors;
};

export const approveInstructor = async (userId: string): Promise<User> => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }

  user.role = UserRole.INSTRUCTOR;
  await userRepository.save(user);

  const mailOptions = {
    ...mailOptionsTemplate,
    to: [user.email],
    subject: '[Smart Education] Account Approved',
    html: `<p>Your account has been <span style="color:green;">approved</span>.
    <br>You have become an instructor and can now log in to the system.</p>`,
  };

  sendEmail(mailOptions);

  return user;
};

export const rejectInstructor = async (userId: string): Promise<void> => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }
  await userRepository.remove(user);

  const mailOptions = {
    ...mailOptionsTemplate,
    to: [user.email],
    subject: '[Smart Education] Account Rejected',
    html: `<p>Your account has been <span style="color:red;">rejected</span>. <br>If you want to use our system,
    please register again and contact the administrator for more information.</p>`,
  };

  sendEmail(mailOptions);
};

export const searchInstructors = async (keyword: string): Promise<User[]> => {
  const query = userRepository
    .createQueryBuilder('user')
    .where('user.name LIKE :keyword', { keyword: `%${keyword}%` })
    .andWhere('user.role = :role', { role: UserRole.INSTRUCTOR });

  const instructors = await query.getMany();
  return instructors;
};

export const searchStudents = async (keyword: string): Promise<User[]> => {
  const query = userRepository
    .createQueryBuilder('user')
    .where('user.name LIKE :keyword', { keyword: `%${keyword}%` })
    .andWhere('user.role = :role', { role: UserRole.STUDENT });

  const students = await query.getMany();
  return students;
};

export const activateUser = async (userId: string) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }

  user.isActivate = true;
  await userRepository.save(user);

  const mailOptions = {
    ...mailOptionsTemplate,
    to: [user.email],
    subject: '[Smart Education] Account Activated',
    html: `<p>Your account has been <span style="color:green;">activated</span>.
    <br>Now you can log in to the system.</p>`,
  };

  sendEmail(mailOptions);

  return user;
};

export const deactivateUser = async (userId: string) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }

  user.isActivate = false;
  await userRepository.save(user);

  const mailOptions = {
    ...mailOptionsTemplate,
    to: [user.email],
    subject: '[Smart Education] Account Deactivated',
    html: `<p>Your account has been <span style="color:red;">deactivated</span>. You can no longer log in to the system.
    <br>If you think this is a mistake, please contact the administrator for more information.</p>`,
  };

  sendEmail(mailOptions);

  return user;
};
