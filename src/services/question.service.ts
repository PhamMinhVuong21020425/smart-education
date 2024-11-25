import { AppDataSource } from '../config/data-source';
import { Question } from '../entity/question.entity';
import { Option } from '../entity/option.entity';
import { Answer } from '../entity/answer.entity';
import { getExamById } from '../services/exam.service';

const questionRepository = AppDataSource.getRepository(Question);
const optionRepository = AppDataSource.getRepository(Option);

export const getQuestionById = async (questionId: string) => {
  const question = await questionRepository.findOne({
    where: {
      id: questionId,
    },
  });
  if (!question) return;
  return question;
};

export const getOptionById = async (optionId: string) => {
  const option = await optionRepository.findOne({
    where: {
      id: optionId,
    },
  });
  if (!option) return;
  return option;
};

export const getQuestionsByExamId = async (examId: string) => {
  const questions = await questionRepository.find({
    where: {
      assignment: {
        id: examId,
      },
    },
    relations: ['options', 'answers', 'assignment'],
    order: {
      created_at: 'ASC',
    },
  });
  return questions;
};

export const createQuestion = async (
  content: string,
  options: string[],
  correctOptions: string[],
  examId: string
) => {
  // Use transaction
  return AppDataSource.manager.transaction(async transactionalEntityManager => {
    const exam = await getExamById(examId);
    if (!exam) return undefined;

    // Create and save the question
    const newQuestion = new Question();
    newQuestion.content = content;
    newQuestion.assignment = exam;

    const savedQuestion = await transactionalEntityManager.save(
      Question,
      newQuestion
    );

    // Create and save options with proper relationship
    const optionEntities = options.map((optionContent, index) => {
      const newOption = new Option();
      newOption.content = optionContent;
      newOption.is_correct = correctOptions.includes(`${index + 1}`);
      newOption.question = savedQuestion;
      return newOption;
    });

    // Save all options
    const savedOptions = await transactionalEntityManager.save(
      Option,
      optionEntities
    );

    // Update the question with the saved options
    savedQuestion.options = savedOptions;

    return savedQuestion;
  });
};

export const getQuestionWithOptions = async (questionId: string) => {
  return questionRepository.findOne({
    where: { id: questionId },
    relations: ['options', 'assignment', 'answers'],
  });
};

export const updateQuestionWithOptions = async (
  questionId: string,
  content: string,
  options: string[],
  optionIds: string[],
  correctOptions: string[]
) => {
  return AppDataSource.manager.transaction(async transactionalEntityManager => {
    const question = await getQuestionWithOptions(questionId);
    if (!question) return;

    // Update question content
    question.content = content;

    // Handle options update
    const updatedOptions = await Promise.all(
      options.map(async (optionContent, index) => {
        if (optionIds[index]) {
          // Update existing option
          const existingOption = question.options.find(
            o => o.id === optionIds[index]
          );
          if (existingOption) {
            existingOption.content = optionContent;
            existingOption.is_correct = correctOptions.includes(`${index + 1}`);
            return transactionalEntityManager.save(Option, existingOption);
          }
        }

        // Create new option
        const newOption = new Option();
        newOption.content = optionContent;
        newOption.is_correct = correctOptions.includes(`${index + 1}`);
        newOption.question = question;
        return transactionalEntityManager.save(Option, newOption);
      })
    );

    question.options = updatedOptions;
    return transactionalEntityManager.save(Question, question);
  });
};

export const deleteQuestionWithOptions = async (questionId: string) => {
  await AppDataSource.manager.transaction(async transactionalEntityManager => {
    const question = await getQuestionWithOptions(questionId);
    if (!question) return;

    // Delete answers
    await transactionalEntityManager.remove(Answer, question.answers);
    // Delete options
    await transactionalEntityManager.remove(Option, question.options);
    // Delete question
    await transactionalEntityManager.remove(Question, question);
  });
};
