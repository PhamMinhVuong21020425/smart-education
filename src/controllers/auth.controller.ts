import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

export const registerGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('Register Get');
  }
);

export const registerPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('Register Post');
  }
);

export const loginGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('Login Get');
  }
);

export const loginPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('Login Post');
  }
);
