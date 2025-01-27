import { defineTable } from 'convex/server';
import { zid, zodToConvex } from 'convex-helpers/server/zod';
import { z } from 'zod';

export const todoFilter = z.enum(['active', 'completed', 'all']);
export type TodoFilter = z.infer<typeof todoFilter>;

export const todoModel = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  description: z.string().optional(),
  title: z.string().min(3, 'To-do title must contain at least 3 characters.'),
  completed: z.boolean().default(false),
  userId: z.string(),
  comments: z.array(zid('comments')).optional(),
});
export type Todo = z.infer<typeof todoModel>;

export const createTodoModel = todoModel.pick({ title: true, description: true });
export type CreateTodo = z.infer<typeof createTodoModel>;

export const todosTable = defineTable(zodToConvex(todoModel));
