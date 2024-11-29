import { IsNull } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Forum } from '../entity/forum.entity';
import { Comment } from '../entity/comment.entity';
import { Course } from '../entity/course.entity';
import { User } from '../entity/user.entity';

const forumRepository = AppDataSource.getRepository(Forum);
const commentRepository = AppDataSource.getRepository(Comment);

export const getForumById = async (id: string) => {
  const forum = await forumRepository.findOneBy({ id });
  return forum;
};

export const getCommentById = async (id: string) => {
  const comment = await commentRepository.findOneBy({ id });
  return comment;
};

export const getForumsByCourseId = async (id: string) => {
  const forums = await forumRepository.find({
    where: { course: { id } },
    order: { created_at: 'DESC' },
  });
  return forums;
};

export const getCommentsByForumId = async (id: string) => {
  const comments = await commentRepository.find({
    where: { forum: { id }, parent: IsNull() },
    relations: {
      user: true,
      children: {
        user: true,
        parent: true,
      },
    },
    order: {
      created_at: 'DESC',
      children: {
        created_at: 'DESC',
      },
    },
  });
  return comments;
};

export const createForum = async (
  course: Course,
  attributes: Record<string, string>
) => {
  const forum = new Forum();
  forum.title = attributes.title;
  forum.content = attributes.content;
  forum.created_at = new Date();
  forum.hidden = attributes.visibility === 'private';
  forum.course = course;
  return forumRepository.save(forum);
};

export const updateForum = async (
  forumId: string,
  attributes: Record<string, string>
) => {
  const forum = await getForumById(forumId);
  if (!forum) return;
  forum.title = attributes.title;
  forum.content = attributes.content;
  forum.hidden = attributes.visibility === 'private';
  return forumRepository.save(forum);
};

export const deleteForum = async (forumId: string) => {
  const forum = await getForumById(forumId);
  if (!forum) return;
  return forumRepository.remove(forum);
};

export const createComment = async (
  user: User,
  forumId: string,
  parentCommentId: string | undefined,
  attributes: Record<string, string>
) => {
  const comment = new Comment();
  comment.content = attributes.content;
  comment.created_at = new Date();
  comment.user = user;
  comment.forum = (await getForumById(forumId))!;
  if (parentCommentId) {
    comment.parent = (await getCommentById(parentCommentId))!;
  }
  return commentRepository.save(comment);
};

export const updateComment = async (
  commentId: string,
  attributes: Record<string, string>
) => {
  const comment = await getCommentById(commentId);
  if (!comment) return;
  comment.content = attributes.content;
  return commentRepository.save(comment);
};

export const deleteComment = async (commentId: string) => {
  const comment = await getCommentById(commentId);
  if (!comment) return;
  return commentRepository.remove(comment);
};
