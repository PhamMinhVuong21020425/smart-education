import { Router, Request, Response } from 'express';
import * as roomController from '../controllers/room.controller';

const router = Router();

// Redirect to a new room
router.get('/', roomController.getNewRoom);

// Render a specific room
router.get('/:room', roomController.getRoom);

export default router;
