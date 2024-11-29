import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Forum } from './forum.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, user => user.comments, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Forum, forum => forum.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'forum_id' })
  forum: Forum;

  @ManyToOne(() => Comment, comment => comment.children, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_comment_id' })
  parent: Comment;

  @OneToMany(() => Comment, comment => comment.parent)
  children: Comment[];

  constructor(partial?: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
