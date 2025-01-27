import { defineTable } from 'convex/server';
import { zid, zodToConvex } from 'convex-helpers/server/zod';
import { z } from 'zod';

export const commentModel = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  comment: z.string().trim().min(1),
  todoId: zid('todos'),
  userId: z.string(),
  upVoters: z.array(z.string()),
  downVoters: z.array(z.string()),
});
export type Comment = z.infer<typeof commentModel>;

export const createCommentModel = commentModel.pick({ comment: true, todoId: true });
export type CreateComment = z.infer<typeof createCommentModel>;

export const commentsTable = defineTable(zodToConvex(commentModel));
