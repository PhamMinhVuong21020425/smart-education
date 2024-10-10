import { User } from '../entity/user.entity';

export type UserWithNumberOfCourse = User & { numberOfCourse?: number };
