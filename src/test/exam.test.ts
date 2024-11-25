import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/user.entity';
import { Assignment } from '../entity/assignment.entity';
import { Grade } from '../entity/grade.entity';
import { AssignmentStatus } from '../enums';
import * as examService from '../services/exam.service';
import * as questionService from '../services/question.service';

let userRepository: Repository<User>;
let gradeRepository: Repository<Grade>;
let examRepository: Repository<Assignment>;

beforeAll(async () => {
  await AppDataSource.initialize();
  userRepository = AppDataSource.getRepository(User);
  gradeRepository = AppDataSource.getRepository(Grade);
  examRepository = AppDataSource.getRepository(Assignment);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Exam Services', () => {
  describe('getExamById', () => {
    it('should return the exam when a valid examId is provided', async () => {
      const result = await examService.getExamById(
        '9e826f42-cdbd-4051-9f87-a6fa6da7756e'
      );

      expect(result).not.toBeNull();
      expect(result!.name).toBe('Data Structures & Algorithm Exam');
    });

    it('should return undefined when no exam is found with the provided examId', async () => {
      const nonExistentExamId = 'non-existent-exam-id';
      const result = await examService.getExamById(nonExistentExamId);
      expect(result).toBeUndefined();
    });
  });

  describe('getGradesByCourseId', () => {
    it('should return the grades for the given course id and student id', async () => {
      const result = await examService.getGradesByCourseId(
        'c1d1e4f1-223b-4cdd-9f0e-0123456789ab',
        '5877df58-ad78-4833-8b04-175e72b6e3db'
      );
      expect(result).not.toBeNull();
      expect(result).toHaveLength(1);
    });

    it('should return an empty array if no grades are found for the given course and student IDs', async () => {
      const courseId = 'course123';
      const studentId = 'student456';
      const result = await examService.getGradesByCourseId(courseId, studentId);
      expect(result).toEqual([]);
    });
  });

  describe('getBestGradeByCourseId', () => {
    it('should return the best grade for the given course and student IDs', async () => {
      const result = await examService.getBestGradeByCourseId(
        'c1d1e4f1-223b-4cdd-9f0e-0123456789ab',
        '8f2e6682-dc87-484f-929b-abac2e193963'
      );
      expect(result).not.toBeNull();
      expect(result!.grade).toBe(3);
    });

    it('should return null if no grades are found for the given course and student IDs', async () => {
      const courseId = 'course123';
      const studentId = 'student456';

      const result = await examService.getBestGradeByCourseId(
        courseId,
        studentId
      );

      expect(result).toBeUndefined();
    });
  });

  describe('updateGradeWhenStartExam', () => {
    it('should update the existing grade when there is only one grade with status TODO', async () => {
      const exam = await examRepository.findOne({
        relations: ['course'],
        where: { id: 'a4d1e4f1-223b-4cdd-9f0e-0123456789ab' },
      });
      const student = await userRepository.findOne({
        where: { id: '5877df58-ad78-4833-8b04-175e72b6e3db' },
      });
      const result = await examService.updateGradeWhenStartExam(
        exam!,
        student!
      );

      expect(result).not.toBeNull();
      expect(result!.status).toBe(AssignmentStatus.DOING);
      expect(result!.attempt).toBe(1);

      result!.status = AssignmentStatus.TODO;
      await gradeRepository.save(result!);
    });

    it('should create a new grade when there are multiple grades or the grade status is not TODO', async () => {
      const exam = await examRepository.findOne({
        relations: ['course'],
        where: { id: '9e826f42-cdbd-4051-9f87-a6fa6da7756e' },
      });
      const student = await userRepository.findOne({
        where: { id: '8f2e6682-dc87-484f-929b-abac2e193963' },
      });
      const result = await examService.updateGradeWhenStartExam(
        exam!,
        student!
      );

      expect(result).not.toBeNull();
      expect(result!.status).toBe(AssignmentStatus.DOING);
      expect(result!.attempt).toBeGreaterThan(1);

      await gradeRepository.delete(result!.id);
    });

    it('should return last grade when there are multiple grades or the grade status is DOING', async () => {
      const exam = await examRepository.findOne({
        relations: ['course'],
        where: { id: '9e826f42-cdbd-4051-9f87-a6fa6da7756e' },
      });
      const student = await userRepository.findOne({
        where: { id: '8f2e6682-dc87-484f-929b-abac2e193963' },
      });
      const lastGrade = await examService.updateGradeWhenStartExam(
        exam!,
        student!
      );

      const result = await examService.updateGradeWhenStartExam(
        exam!,
        student!
      );

      expect(result.id).toBe(lastGrade.id);
      expect(result!.status).toBe(AssignmentStatus.DOING);
      expect(result!.attempt).toBeGreaterThan(1);

      await gradeRepository.delete(result!.id);
    });
  });

  describe('updateGradeWhenSubmitExam', () => {
    it('should update the latest grade attempt with the provided grade, max_grade, feedback, and set status to PASS if the grade is above the passing rate', async () => {
      const exam = await examRepository.findOne({
        relations: ['course'],
        where: { id: 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab' },
      });
      const student = await userRepository.findOne({
        where: { id: '5877df58-ad78-4833-8b04-175e72b6e3db' },
      });
      await examService.updateGradeWhenStartExam(exam!, student!);

      const result = await examService.updateGradeWhenSubmitExam(
        exam!,
        student!,
        5,
        5
      );

      expect(result).not.toBeNull();
      expect(result!.status).toBe(AssignmentStatus.PASS);
      expect(result!.attempt).toBe(1);
      expect(result!.grade).toBe(5);
      expect(result!.max_grade).toBe(5);

      await gradeRepository.delete(result!.id);
    });

    it('should update the latest grade attempt with the provided grade, max_grade, feedback, and set status to FAIL if the grade is below the passing rate', async () => {
      const exam = await examRepository.findOne({
        relations: ['course'],
        where: { id: 'a1d1e4f1-223b-4cdd-9f0e-0123456789ab' },
      });
      const student = await userRepository.findOne({
        where: { id: '8f2e6682-dc87-484f-929b-abac2e193963' },
      });
      await examService.updateGradeWhenStartExam(exam!, student!);

      const result = await examService.updateGradeWhenSubmitExam(
        exam!,
        student!,
        1,
        3
      );

      expect(result).not.toBeNull();
      expect(result!.status).toBe(AssignmentStatus.FAIL);
      expect(result!.attempt).toBeGreaterThan(2);
      expect(result!.grade).toBe(1);
      expect(result!.max_grade).toBe(3);

      await gradeRepository.delete(result!.id);
    });
  });

  describe('createAnswersFromExam', () => {
    it('should create answers for the provided questions, user, and optionId', async () => {
      const examId = '9e826f42-cdbd-4051-9f87-a6fa6da7756e';
      const questions = await questionService.getQuestionsByExamId(examId);
      const answers = {
        '5a71ab24-cace-4aa2-81bf-3d1cb53d6ca6':
          '254a8133-f3bb-4b16-8e7b-5b3c51973a52',
      };
      const user = await userRepository.findOne({
        where: { id: '8f2e6682-dc87-484f-929b-abac2e193963' },
      });

      const result = await examService.createAnswersFromExam(
        questions!,
        user!,
        answers
      );

      expect(result).not.toBeNull();
      expect(result).toHaveLength(2);
    });
  });

  describe('getResultOfExam', () => {
    it('should return the result of the exam for the provided userId and examId', async () => {
      const result = await examService.getResultOfExam(
        '8f2e6682-dc87-484f-929b-abac2e193963',
        'a1d1e4f1-223b-4cdd-9f0e-0123456789ab'
      );

      expect(result).not.toBeNull();
      expect(result!.score).toBe(1);
      expect(result!.filteredAnswers).toHaveLength(3);
    });

    it('should return filteredAnswers = [] and score = 0 when no result is found for the provided userId and examId', async () => {
      const nonExistentUserId = 'non-existent-user-id';
      const nonExistentExamId = 'non-existent-exam-id';

      const result = await examService.getResultOfExam(
        nonExistentUserId,
        nonExistentExamId
      );

      expect(result.filteredAnswers).toEqual([]);
      expect(result.score).toBe(0);
    });
  });

  describe('getAllUserGradesByCourseId', () => {
    it('should return all user grades for the provided courseId', async () => {
      const result = await examService.getAllUserGradesByCourseId(
        'c1d1e4f1-223b-4cdd-9f0e-0123456789ab'
      );

      expect(result).not.toBeNull();
      expect(result).toHaveLength(9);
    });

    it('should return an empty array when no user grades are found for the provided courseId', async () => {
      const nonExistentCourseId = 'non-existent-course-id';

      const result =
        await examService.getAllUserGradesByCourseId(nonExistentCourseId);

      expect(result).toEqual([]);
    });
  });

  describe('getGradeById', () => {
    it('should return the grade for the provided gradeId', async () => {
      const result = await examService.getGradeById(
        '1d5206e8-d805-470e-a49a-3a6ba6db5b36'
      );

      expect(result).not.toBeNull();
      expect(result!.grade).toBe(1);
    });

    it('should return undefined when no grade is found with the provided gradeId', async () => {
      const nonExistentGradeId = 'non-existent-grade-id';
      const result = await examService.getGradeById(nonExistentGradeId);
      expect(result).toBeNull();
    });
  });

  describe('getResultOfExamByGradeId', () => {
    it('should return the result of the exam for the provided gradeId', async () => {
      const result = await examService.getResultOfExamByGradeId(
        '1d5206e8-d805-470e-a49a-3a6ba6db5b36'
      );

      expect(result).not.toBeNull();
      expect(result!.score).toBe(1);
      expect(result!.answers).toHaveLength(1);
    });

    it('should return undefined when no result is found for the provided gradeId', async () => {
      const nonExistentGradeId = 'non-existent-grade-id';

      const result =
        await examService.getResultOfExamByGradeId(nonExistentGradeId);

      expect(result).toBeUndefined();
    });
  });

  describe('updateGradeById', () => {
    it('should update the grade with the provided gradeId and feedback', async () => {
      const gradeId = '1d5206e8-d805-470e-a49a-3a6ba6db5b36';
      const feedback = 'Good job!';

      const result = await examService.updateGradeById(gradeId, feedback);

      expect(result).not.toBeNull();
      expect(result!.feedback).toBe(feedback);
    });

    it('should return undefined when no grade is found with the provided gradeId', async () => {
      const nonExistentGradeId = 'non-existent-grade-id';
      const feedback = 'Good job!';

      const result = await examService.updateGradeById(
        nonExistentGradeId,
        feedback
      );

      expect(result).toBeUndefined();
    });
  });

  describe('createExam', () => {
    it('should return the created exam', async () => {
      const attribute: Record<string, string> = {
        name: 'The test Exam',
        description: 'This is a test exam',
        deadline: '2024-11-31T23:59:59.999Z',
        timeLimit: '60',
        attemptLimit: '3',
      };

      const courseId = 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab';

      const result = await examService.createExam(attribute, courseId);

      expect(result).not.toBeNull();
      expect(result!.name).toBe(attribute.name);

      await examRepository.delete(result!.id);
    });

    it('should return undefined when no exam is found with the provided courseId', async () => {
      const attribute: Record<string, string> = {
        name: 'The test Exam',
        description: 'This is a test exam',
        deadline: '2024-11-31T23:59:59.999Z',
        timeLimit: '60',
        attemptLimit: '3',
      };

      const courseId = 'non-existent-course-id';

      const result = await examService.createExam(attribute, courseId);

      expect(result).toBeUndefined();
    });
  });

  describe('updateExam', () => {
    it('should return the updated exam', async () => {
      const examId = '9e826f42-cdbd-4051-9f87-a6fa6da7756e';
      const attribute: Record<string, string> = {
        name: 'The test Exam',
        description: 'This is a test exam',
        deadline: '2024-11-31T23:59:59.999Z',
        timeLimit: '60',
        attemptLimit: '3',
      };

      const result = await examService.updateExam(examId, attribute);

      expect(result).not.toBeNull();
      expect(result!.name).toBe(attribute.name);
    });

    it('should return undefined when no exam is found with the provided examId', async () => {
      const examId = 'non-existent-exam-id';
      const attribute: Record<string, string> = {
        name: 'The test Exam',
        description: 'This is a test exam',
        deadline: '2024-11-31T23:59:59.999Z',
        timeLimit: '60',
        attemptLimit: '3',
      };

      const result = await examService.updateExam(examId, attribute);

      expect(result).toBeUndefined();
    });
  });
});
