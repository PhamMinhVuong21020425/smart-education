import { AppDataSource } from '../config/data-source';
import { Course } from '../entity/course.entity';
import { User } from '../entity/user.entity';

const courseRepository = AppDataSource.getRepository(Course);
const userRepository = AppDataSource.getRepository(User);

export const searchCourses = async (keyword: string): Promise<Course[]> => {
  return await courseRepository
    .createQueryBuilder('course')
    .where('course.name LIKE :keyword', { keyword: `%${keyword}%` })
    .getMany();
};

export const searchInstructors = async (keyword: string): Promise<User[]> => {
  return await userRepository
    .createQueryBuilder('user')
    .where('user.name LIKE :keyword', { keyword: `%${keyword}%` })
    .andWhere('user.role = :role', { role: 'INSTRUCTOR' })
    .getMany();
};
