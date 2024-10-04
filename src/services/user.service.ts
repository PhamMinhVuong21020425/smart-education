import { AppDataSource } from '../config/data-source';
import { User } from '../entity/user.entity';
import { UserRole } from '../enums/UserRole';

const userRepository = AppDataSource.getRepository(User);

export const getInstructorList = async () => {
  return userRepository.find({
    order: { username: 'ASC' },
    where: { role: UserRole.INSTRUCTOR },
  });
};

export const getStudentList = async () => {
  return userRepository.find({
    order: { username: 'ASC' },
    where: { role: UserRole.STUDENT },
  });
};

export const getUserById = async (id: string) => {
  return userRepository.findOne({ where: { id } });
};
