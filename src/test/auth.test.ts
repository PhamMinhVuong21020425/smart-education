import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/user.entity';
import { UserRole } from '../enums/UserRole';
import * as authService from '../services/auth.service';

let userRepository: Repository<User>;

beforeAll(async () => {
  await AppDataSource.initialize();
  userRepository = AppDataSource.getRepository(User);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Auth Services', () => {
  describe('findUserByUsername', () => {
    it('should return user that match the username', async () => {
      const user = await authService.findUserByUsername('hoanx');

      expect(user).toBeDefined();
      expect(user?.id).toBe('ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce');
      expect(user?.email).toBe('zuanki@gmail.com');
      expect(user?.role).toBe(UserRole.INSTRUCTOR);
    });
  });

  describe('findUserByEmail', () => {
    it('should return user that match the email', async () => {
      const user = await authService.findUserByEmail('phamminhv26@gmail.com');

      expect(user).toBeDefined();
      expect(user?.id).toBe('123878ff-cd3d-4c94-aee3-cab0e0f6b27e');
      expect(user?.role).toBe(UserRole.INSTRUCTOR);
    });
  });

  describe('saveUser', () => {
    it('should save user into database', async () => {
      const user = new User();
      user.username = 'test';
      user.email = 'abc@gmail.com';
      user.hash_password = '123456';
      const savedUser = await authService.saveUser(user);

      expect(savedUser).toBeDefined();
      expect(savedUser.id).toBeDefined();
      expect(savedUser.username).toBe('test');
      expect(savedUser.email).toBe('abc@gmail.com');

      await userRepository.delete(savedUser.id);
    });
  });

  describe('authenticateUser', () => {
    it('should return user that match the username and password', async () => {
      const user = await authService.authenticateUser('hoanx', '123456');

      expect(user).toBeDefined();
      expect(user?.id).toBe('ad11ffa9-f4b0-4e8b-bbf0-e0f16c3854ce');
      expect(user?.email).toBe('zuanki@gmail.com');
      expect(user?.role).toBe(UserRole.INSTRUCTOR);
    });

    it('should return null if username or password is incorrect', async () => {
      const user = await authService.authenticateUser('abc', '123456');

      expect(user).toBeNull();
    });
  });
});
