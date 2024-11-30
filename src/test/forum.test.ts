import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Forum } from '../entity/forum.entity';
import { Comment } from '../entity/comment.entity';
import { User } from '../entity/user.entity';
import { Course } from '../entity/course.entity';
import * as forumService from '../services/forum.service';

let forumRepository: Repository<Forum>;
let commentRepository: Repository<Comment>;
let courseRepository: Repository<Course>;

beforeAll(async () => {
  await AppDataSource.initialize();
  forumRepository = AppDataSource.getRepository(Forum);
  commentRepository = AppDataSource.getRepository(Comment);
  courseRepository = AppDataSource.getRepository(Course);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Forum Services', () => {
  describe('getForumById', () => {
    it('should return a forum by id', async () => {
      const forum = await forumService.getForumById(
        'cb829160-569d-4f76-b65a-01ee373fc574'
      );
      expect(forum).toBeInstanceOf(Forum);
      expect(forum?.title).toBe('My forum');
      expect(forum?.content).toBe('Notifications for students');
    });

    it('should return null if forum is not found', async () => {
      const forum = await forumService.getForumById('non-existing-id');
      expect(forum).toBeNull();
    });
  });

  describe('getCommentById', () => {
    it('should return a comment by id', async () => {
      const comment = await forumService.getCommentById(
        '9a4f9203-7618-438d-9d89-152073b76bad'
      );
      expect(comment).toBeInstanceOf(Comment);
      expect(comment?.content).toBe('My comment');
    });

    it('should return null if comment is not found', async () => {
      const comment = await forumService.getCommentById('non-existing-id');
      expect(comment).toBeNull();
    });
  });

  describe('getForumsByCourseId', () => {
    it('should return forums by course id', async () => {
      const forums = await forumService.getForumsByCourseId(
        'c7d1e4f1-223b-4cdd-9f0e-0123456789ab'
      );
      expect(forums).toBeInstanceOf(Array);
      expect(forums).toHaveLength(2);
      expect(forums[0].title).toBe('New discussion');
    });

    it('should return an empty array if no forums are found', async () => {
      const forums = await forumService.getForumsByCourseId('non-existing-id');
      expect(forums).toBeInstanceOf(Array);
      expect(forums).toHaveLength(0);
    });
  });

  describe('getCommentsByForumId', () => {
    it('should return comments by forum id', async () => {
      const comments = await forumService.getCommentsByForumId(
        'cb829160-569d-4f76-b65a-01ee373fc574'
      );
      expect(comments).toBeInstanceOf(Array);
      expect(comments).toHaveLength(3);
      expect(comments[0].content).toBe('Notification comment');
      expect(comments[0].user.name).toBe('21020425 Phạm Minh Vương');
    });

    it('should return an empty array if no comments are found', async () => {
      const comments =
        await forumService.getCommentsByForumId('non-existing-id');
      expect(comments).toBeInstanceOf(Array);
      expect(comments).toHaveLength(0);
    });
  });

  describe('createForum', () => {
    it('should create a forum', async () => {
      const course = await courseRepository.findOne({
        where: { id: 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab' },
      });

      const forum = await forumService.createForum(course!, {
        title: 'Test forum',
        content: 'Test forum content',
        visibility: 'private',
      });

      expect(forum).toBeInstanceOf(Forum);
      expect(forum.title).toBe('Test forum');
      expect(forum.content).toBe('Test forum content');
      expect(forum.hidden).toBe(true);
    });
  });

  describe('updateForum', () => {
    it('should update a forum', async () => {
      const forum = await forumRepository.findOne({
        where: {
          title: 'Test forum',
          course: { id: 'c7d1e4f1-223b-4cdd-9f0e-0123456789ab' },
        },
      });

      const updatedForum = await forumService.updateForum(forum!.id, {
        title: 'Updated forum',
        content: 'Updated forum content',
      });

      expect(updatedForum).toBeInstanceOf(Forum);
      expect(updatedForum?.title).toBe('Updated forum');
      expect(updatedForum?.content).toBe('Updated forum content');

      await forumRepository.delete(forum!.id);
    });

    it('should return null if forum is not found', async () => {
      const updatedForum = await forumService.updateForum('non-existing-id', {
        title: 'Updated forum',
        content: 'Updated forum content',
      });

      expect(updatedForum).toBeUndefined();
    });
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      const user = await AppDataSource.getRepository(User).findOne({
        where: { name: '21020425 Phạm Minh Vương' },
      });

      const forumId = 'cb829160-569d-4f76-b65a-01ee373fc574';

      const comment = await forumService.createComment(
        user!,
        forumId,
        undefined,
        { content: 'Test comment' }
      );

      expect(comment).toBeInstanceOf(Comment);
      expect(comment.content).toBe('Test comment');
      expect(comment.user.name).toBe('21020425 Phạm Minh Vương');

      await commentRepository.remove(comment);
    });

    it('should create a reply comment', async () => {
      const user = await AppDataSource.getRepository(User).findOne({
        where: { name: '21020425 Phạm Minh Vương' },
      });

      const forumId = 'cb829160-569d-4f76-b65a-01ee373fc574';

      const parentCommentId = '84b00810-b7f7-4a98-9b7c-3336cccbaedb';

      const comment = await forumService.createComment(
        user!,
        forumId,
        parentCommentId,
        { content: 'Test reply comment' }
      );

      expect(comment).toBeInstanceOf(Comment);
      expect(comment.content).toBe('Test reply comment');
      expect(comment.user.name).toBe('21020425 Phạm Minh Vương');
      expect(comment.parent!.content).toBe('Notification comment');

      await commentRepository.remove(comment);
    });
  });

  describe('updateComment', () => {
    it('should update a comment', async () => {
      const comment = await commentRepository.findOne({
        where: { content: 'My comment' },
      });

      const updatedComment = await forumService.updateComment(comment!.id, {
        content: 'Updated comment',
      });

      expect(updatedComment).toBeInstanceOf(Comment);
      expect(updatedComment?.content).toBe('Updated comment');

      await commentRepository.update(comment!.id, { content: 'My comment' });
    });

    it('should return null if comment is not found', async () => {
      const updatedComment = await forumService.updateComment(
        'non-existing-id',
        { content: 'Updated comment' }
      );

      expect(updatedComment).toBeUndefined();
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      const user = await AppDataSource.getRepository(User).findOne({
        where: { name: '21020425 Phạm Minh Vương' },
      });

      const forumId = 'cb829160-569d-4f76-b65a-01ee373fc574';

      const comment = await forumService.createComment(
        user!,
        forumId,
        undefined,
        { content: 'Test comment' }
      );

      await forumService.deleteComment(comment.id);

      const deletedComment = await forumService.getCommentById(comment.id);

      expect(deletedComment).toBeNull();
    });

    it('should return undefined if comment is not found', async () => {
      const deletedComment =
        await forumService.deleteComment('non-existing-id');

      expect(deletedComment).toBeUndefined();
    });
  });
});
