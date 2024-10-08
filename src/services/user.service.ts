import { AppDataSource } from '../config/data-source';
import { User } from '../entity/user.entity';
import { UserRole } from '../enums/UserRole';
import { UserWithNumberOfCourse } from '../helpers/user.helper';
import { getUserCourseList } from './course.service';

const userRepository = AppDataSource.getRepository(User);

export const getInstructorList = async () => {
  const instructors: UserWithNumberOfCourse[] = await userRepository.find({
    order: { username: 'ASC' },
    where: { role: UserRole.INSTRUCTOR },
  });
  for (const instructor of instructors) {
    const courses = await getUserCourseList(instructor);
    instructor.numberOfCourse = courses.length;
  }
  return instructors;
};

export const getStudentList = async () => {
  const students: UserWithNumberOfCourse[] = await userRepository.find({
    order: { username: 'ASC' },
    where: { role: UserRole.STUDENT },
  });

  for (const student of students) {
    const courses = await getUserCourseList(student);
    student.numberOfCourse = courses.length;
  }
  return students;
};

export const getUserById = async (id: string) => {
  return userRepository.findOne({ where: { id } });
};

export const updateUser = async (
  id: string,
  updateData: Partial<User>
): Promise<User | null> => {
  const user = await getUserById(id);
  if (!user) {
    return null;
  }
  Object.assign(user, updateData);
  return userRepository.save(user);
};
