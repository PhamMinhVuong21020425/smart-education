import { AppDataSource } from '../config/data-source';
import * as questionService from '../services/question.service';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Question Services', () => {
  describe('getQuestionById', () => {
    it('should return the question for the provided questionId', async () => {
      const result = await questionService.getQuestionById('q10');

      expect(result).not.toBeNull();
      expect(result!.content).toBe('Who developed the theory of relativity?');
    });

    it('should return undefined when no question is found with the provided questionId', async () => {
      const nonExistentQuestionId = 'non-existent-question-id';

      const result = await questionService.getQuestionById(
        nonExistentQuestionId
      );

      expect(result).toBeUndefined();
    });
  });

  describe('getOptionById', () => {
    it('should return the option for the provided optionId', async () => {
      const result = await questionService.getOptionById('o10');

      expect(result).not.toBeNull();
      expect(result!.content).toBe('Mars');
    });

    it('should return undefined when no option is found with the provided optionId', async () => {
      const nonExistentOptionId = 'non-existent-option-id';
      const result = await questionService.getOptionById(nonExistentOptionId);
      expect(result).toBeUndefined();
    });
  });

  describe('getQuestionsByExamId', () => {
    it('should return the questions for the provided examId', async () => {
      const result = await questionService.getQuestionsByExamId(
        'a1d1e4f1-223b-4cdd-9f0e-0123456789ab'
      );

      expect(result).not.toBeNull();
      expect(result).toHaveLength(3);
    });

    it('should return an empty array when no questions are found for the provided examId', async () => {
      const nonExistentExamId = 'non-existent-exam-id';

      const result =
        await questionService.getQuestionsByExamId(nonExistentExamId);

      expect(result).toEqual([]);
    });
  });

  describe('createQuestion', () => {
    it('should create a new question and return the created question', async () => {
      const content = 'What is the capital of France?';
      const options = ['Paris', 'London', 'Berlin', 'Madrid'];
      const correctOptions = ['Paris'];
      const examId = 'a3d1e4f1-223b-4cdd-9f0e-0123456789ab';

      const result = await questionService.createQuestion(
        content,
        options,
        correctOptions,
        examId
      );

      expect(result).not.toBeNull();
      expect(result!.content).toBe(content);
      expect(result!.assignment.id).toBe(examId);
      expect(result!.options).toHaveLength(options.length);
    });

    it('should return undefined when no exam is found with the provided examId', async () => {
      const content = 'What is the capital of France?';
      const options = ['Paris', 'London', 'Berlin', 'Madrid'];
      const correctOptions = ['Paris'];
      const nonExistentExamId = 'non-existent-exam-id';

      const result = await questionService.createQuestion(
        content,
        options,
        correctOptions,
        nonExistentExamId
      );

      expect(result).toBeUndefined();
    });
  });

  describe('getQuestionWithOptions', () => {
    it('should return the question with options for the provided questionId', async () => {
      const result = await questionService.getQuestionWithOptions('q10');

      expect(result).not.toBeNull();
      expect(result!.content).toBe('Who developed the theory of relativity?');
      expect(result!.options).toHaveLength(3);
    });
  });

  describe('updateQuestionWithOptions', () => {
    it('should update the question and return the updated question', async () => {
      const questionId = 'q10';
      const content = 'Who developed the theory of relativity?';
      const options = ['Darwin', 'Newton', 'Einstein', 'Tesla'];
      const optionIds = ['newopt1', 'o28', 'o29', 'o30'];
      const correctOptions = ['Einstein'];

      const result = await questionService.updateQuestionWithOptions(
        questionId,
        content,
        options,
        optionIds,
        correctOptions
      );

      expect(result).not.toBeNull();
      expect(result!.content).toBe(content);
      expect(result!.options).toHaveLength(options.length);
    });

    it('should return undefined when no question is found with the provided questionId', async () => {
      const nonExistentQuestionId = 'non-existent-question-id';
      const content = 'Who developed the theory of relativity?';
      const options = ['Darwin', 'Newton', 'Einstein', 'Tesla'];
      const optionIds = ['newopt1', 'o28', 'o29', 'o30'];
      const correctOptions = ['Einstein'];

      const result = await questionService.updateQuestionWithOptions(
        nonExistentQuestionId,
        content,
        options,
        optionIds,
        correctOptions
      );

      expect(result).toBeUndefined();
    });
  });

  describe('deleteQuestionWithOptions', () => {
    it('should delete the question with options for the provided questionId', async () => {
      await questionService.deleteQuestionWithOptions('q10');

      const question = await questionService.getQuestionById('q10');
      expect(question).toBeUndefined();
    });

    it('should not throw an error when no question is found with the provided questionId', async () => {
      const nonExistentQuestionId = 'non-existent-question-id';

      await questionService.deleteQuestionWithOptions(nonExistentQuestionId);

      const question = await questionService.getQuestionById(
        nonExistentQuestionId
      );
      expect(question).toBeUndefined();
    });
  });
});
