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

  return user;
};

export const rejectInstructor = async (userId: string): Promise<void> => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }
  await userRepository.remove(user);
};

export const getInstructorDetails = async (userId: string): Promise<User> => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const searchInstructors = async (keyword: string): Promise<User[]> => {
  const query = userRepository
    .createQueryBuilder('user')
    .where('user.name LIKE :keyword', { keyword: `%${keyword}%` })
    .andWhere('user.role = :role', { role: UserRole.INSTRUCTOR });

  const instructors = await query.getMany();
  return instructors;
};
