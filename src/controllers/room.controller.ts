import { NextFunction, Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { v4 as uuidV4 } from 'uuid';

export const getNewRoom = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.redirect(`room/${uuidV4()}`);
    }
);

export const getRoom = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const roomId: string = req.params.room;
        res.render('room/index', { roomId });
    }
);
