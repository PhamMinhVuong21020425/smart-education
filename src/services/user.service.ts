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
