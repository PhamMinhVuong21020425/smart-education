import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Comment } from './comment.entity';

@Entity('forums')
export class Forum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  hidden: boolean;

  @ManyToOne(() => Course, course => course.forums, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Comment, comment => comment.forum)
  comments: Comment[];

  constructor(partial?: Partial<Forum>) {
    Object.assign(this, partial);
  }
}
