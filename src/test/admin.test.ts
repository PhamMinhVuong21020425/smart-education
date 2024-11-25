import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/user.entity';
import { UserRole } from '../enums/UserRole';
import * as adminService from '../services/admin.service';

let userRepository: Repository<User>;

beforeAll(async () => {
    await AppDataSource.initialize();
    userRepository = AppDataSource.getRepository(User);
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe('Admin Services', () => {
    describe('getStatistics', () => {
        it('should return statistics of courses and instructors', async () => {
            const statistics = await adminService.getStatistics();

            expect(statistics.totalCourses).toBe(15);
            expect(statistics.totalInstructors).toBe(3);
            expect(statistics.pendingInstructors).toBe(1);
        });
    });

    describe('getPendingInstructors', () => {
        it('should return list of pending instructors', async () => {
            const pendingInstructors = await adminService.getPendingInstructors();

            expect(pendingInstructors).toHaveLength(1);
            expect(pendingInstructors[0].email).toBe('new@gmail.com');
            expect(pendingInstructors[0].role).toBe(UserRole.PENDING_APPROVAL);
        });
    });

    describe('approveInstructor', () => {
        it('should approve the instructor', async () => {
            const pendingInstructors = await adminService.getPendingInstructors();
            const approvedInstructor = await adminService.approveInstructor(
                pendingInstructors[0].id
            );

            expect(approvedInstructor.role).toBe(UserRole.INSTRUCTOR);

            approvedInstructor.role = UserRole.PENDING_APPROVAL;
            await userRepository.save(approvedInstructor);
        });

        it('should throw error if user not found', async () => {
            try {
                await adminService.approveInstructor('non-existing-id');
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect((error as Error).message).toBe('User not found');
            }
        });
    });

    describe('rejectInstructor', () => {
        it('should reject the instructor', async () => {
            const newUser = new User();
            newUser.username = 'abc';
            newUser.email = 'abc@gmai.com';
            newUser.hash_password = '123456';
            newUser.role = UserRole.PENDING_APPROVAL;
            await userRepository.save(newUser);
            await adminService.rejectInstructor(newUser.id);

            const rejectedInstructor = await userRepository.findOne({
                where: { id: newUser.id },
            });

            expect(rejectedInstructor).toBeNull;
        });

        it('should throw error if user not found', async () => {
            try {
                await adminService.rejectInstructor('non-existing-id');
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect((error as Error).message).toBe('User not found');
            }
        });
    });

    describe('searchInstructors', () => {
        it('should return list of instructors that match the keyword', async () => {
            const instructors = await adminService.searchInstructors('vuong');

            expect(instructors).toHaveLength(1);
            expect(instructors[0].email).toBe('phamminhv26@gmail.com');
            expect(instructors[0].username).toBe('pmv');
            expect(instructors[0].role).toBe(UserRole.INSTRUCTOR);
        });
    });

    describe('searchInstructors', () => {
        it('should return list of instructors that match the keyword', async () => {
            const instructors = await adminService.searchStudents('vuong');

            expect(instructors).toHaveLength(4);
            expect(instructors[0].email).toBe('pham.minh.vuong.vnu@gmail.com');
            expect(instructors[0].username).toBe('Vuong');
            expect(instructors[0].role).toBe(UserRole.STUDENT);
        });
    });

    describe('activateUser', () => {
        it('should return user is activated', async () => {
            const userId = 'b6281679-02c0-4543-a7fb-210429105267';
            const user = await adminService.activateUser(userId);

            expect(user.isActivate).toBe(true);
            expect(user.email).toBe('harry@gmail.com');
        });

        it('should throw error if user not found', async () => {
            try {
                const userId = 'non-existing-id';
                const user = await adminService.activateUser(userId);
                expect(user).toBeUndefined();
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect((error as Error).message).toBe('User not found');
            }
        });
    });

    describe('deactivateUser', () => {
        it('should return user is deactivated', async () => {
            const userId = 'b6281679-02c0-4543-a7fb-210429105267';
            const user = await adminService.deactivateUser(userId);

            expect(user.isActivate).toBe(false);
            expect(user.email).toBe('harry@gmail.com');
        });

        it('should throw error if user not found', async () => {
            try {
                const userId = 'non-existing-id';
                const user = await adminService.deactivateUser(userId);
                expect(user).toBeUndefined();
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect((error as Error).message).toBe('User not found');
            }
        });
    });
});
