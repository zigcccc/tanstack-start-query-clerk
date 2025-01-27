import { authMutation } from 'convex/shared';

import { createCommentModel } from './models';

export const create = authMutation({
  args: { data: createCommentModel },
  handler: async (ctx, { data }) => {
    const todo = await ctx.db.get(data.todoId);

    if (!todo) {
      throw new Error('Linked todo not found');
    }

    const commentId = await ctx.db.insert('comments', {
      ...data,
      userId: ctx.user.tokenIdentifier,
      upVoters: [],
      downVoters: [],
    });
    const updatedTodoComments = todo.comments ? [commentId, ...todo.comments] : [commentId];
    await ctx.db.patch(todo._id, { comments: updatedTodoComments });
    return { success: true, id: commentId };
  },
});
