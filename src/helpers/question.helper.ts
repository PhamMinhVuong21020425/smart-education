import { Request } from 'express';

export interface RequestForQuestion extends Request {
  courseID?: string;
  examID?: string;
}
