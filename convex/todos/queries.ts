import { authMutation, authQuery, mutation, query } from 'convex/shared';
import { ConvexError } from 'convex/values';
import { zid } from 'convex-helpers/server/zod';
import { z } from 'zod';

import { createTodoModel, todoFilter } from './models';

export const list = query({
  args: {
    filter: todoFilter.default('all'),
  },
  handler: async (ctx, { filter }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error('Unauthenticated');
    }

    return await ctx.db
      .query('todos')
      .filter((q) => {
        const userCondition = q.eq(q.field('userId'), user.tokenIdentifier);
        const filterCondition = q.eq(q.field('completed'), filter !== 'active');

        return filter === 'all' ? userCondition : q.and(userCondition, filterCondition);
      })
      .collect();
  },
});

export const read = query({
  args: { id: z.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError('Unauthenticated');
    }

    const todo = await ctx.db
      .query('todos')
      .filter((q) => q.and(q.eq(q.field('_id'), args.id), q.eq(q.field('userId'), user.tokenIdentifier)))
      .first();

    if (!todo) {
      throw new ConvexError('NotFound');
    }

    return todo;
  },
});

export const create = mutation({
  args: { data: createTodoModel },
  handler: async (ctx, { data }) => {
    const user = await ctx.auth.getUserIdentity();
    console.log({ user });
    if (!user) {
      throw new ConvexError('Unauthenticated');
    }

    const todoId = await ctx.db.insert('todos', { ...data, userId: user.tokenIdentifier, completed: false });

    return { success: true, id: todoId };
  },
});

export const remove = authMutation({
  args: { id: zid('todos') },
  handler: async (ctx, { id }) => {
    const todo = await ctx.db
      .query('todos')
      .filter((q) => q.and(q.eq(q.field('_id'), id), q.eq(q.field('userId'), ctx.user.tokenIdentifier)))
      .first();

    if (!todo) {
      throw new ConvexError('NotFound');
    }

    return await ctx.db.delete(id);
  },
});

export const toggleCompleted = authMutation({
  args: { id: zid('todos') },
  handler: async (ctx, { id }) => {
    const todo = await ctx.db
      .query('todos')
      .filter((q) => q.and(q.eq(q.field('_id'), id), q.eq(q.field('userId'), ctx.user.tokenIdentifier)))
      .first();

    if (!todo) {
      throw new ConvexError('NotFound');
    }

    return await ctx.db.patch(id, { completed: !todo.completed });
  },
});

export const listTodoComments = authQuery({
  args: { id: zid('todos') },
  handler: async (ctx, { id }) => {
    const todo = await ctx.db
      .query('todos')
      .filter((q) => q.and(q.eq(q.field('_id'), id), q.eq(q.field('userId'), ctx.user.tokenIdentifier)))
      .first();

    if (!todo) {
      throw new ConvexError('NotFound');
    }

    const comments = await Promise.all((todo?.comments ?? []).map((commentId) => ctx.db.get(commentId)));
    console.log({ comments });
    return comments.filter((comment) => comment !== null);
  },
});
