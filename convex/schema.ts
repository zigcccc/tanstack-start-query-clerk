import { defineSchema } from 'convex/server';

import { commentsTable } from './comments/models';
import { todosTable } from './todos/models';

export default defineSchema({
  todos: todosTable,
  comments: commentsTable,
});
