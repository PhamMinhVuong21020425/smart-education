import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { RequestForQuestion } from '../helpers/question.helper';
import {
  createQuestion,
  updateQuestionWithOptions,
  deleteQuestionWithOptions,
} from '../services/question.service';

export const questionList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('question list');
  }
);

export const questionDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`question detail: ${req.params.id}`);
  }
);

export const questionCreateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('question is created with method GET');
  }
);

export const questionCreatePost = asyncHandler(
  async (req: RequestForQuestion, res: Response, next: NextFunction) => {
    const content = req.body.content;
    const options = req.body.options;
    const correctOptions = req.body.correctOptions ?? [];

    const question = await createQuestion(
      content,
      options,
      correctOptions,
      req.examID!
    );
    if (!question) {
      req.flash('error', 'Failed to create question');
      res.redirect('/error');
    } else {
      res.redirect(
        `/courses/${req.courseID}/exam/${req.examID}/manage#${question.id}`
      );
    }
  }
);

export const questionDeleteGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`question ${req.params.id} is deleted with method GET`);
  }
);

export const questionDeletePost = asyncHandler(
  async (req: RequestForQuestion, res: Response, next: NextFunction) => {
    await deleteQuestionWithOptions(req.params.id);
    const questionPreviousId = req.body.questionPreviousId;
    res.redirect(
      `/courses/${req.courseID}/exam/${req.examID}/manage#${questionPreviousId ?? ''}`
    );
  }
);

export const questionUpdateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`question ${req.params.id} is updated with method GET `);
  }
);

export const questionUpdatePost = asyncHandler(
  async (req: RequestForQuestion, res: Response, next: NextFunction) => {
    const content = req.body.content;
    const options = req.body.options;
    const optionIds = req.body.optionIds;
    const correctOptions = req.body.correctOptions ?? [];

    const question = await updateQuestionWithOptions(
      req.params.id,
      content,
      options,
      optionIds,
      correctOptions
    );
    if (!question) {
      req.flash('error', 'Failed to update question');
      res.redirect('/error');
    } else {
      res.redirect(
        `/courses/${req.courseID}/exam/${req.examID}/manage#${question.id}`
      );
    }
  }
);
