import { NextFunction, Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { v4 as uuidV4 } from 'uuid';
import encryptId from '../utils/encrypt';
import * as dotenv from 'dotenv';
dotenv.config();

export const getNewRoom = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.redirect(`room/${uuidV4()}`);
  }
);

export const postRoom = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId: string = req.body.courseId;
    const secretKey: string = process.env.CRYPTO_SECRET_KEY || '123456';
    const roomId = encryptId(courseId, secretKey);
    res.redirect(`room/${roomId}`);
  }
);

export const getRoom = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const roomId: string = req.params.room;
    res.render('room/index', { roomId });
  }
);
