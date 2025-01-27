import { query as baseQuery, mutation as baseMutation } from 'convex/_generated/server';
import { ConvexError } from 'convex/values';
import { NoOp, customCtx } from 'convex-helpers/server/customFunctions';
import { zCustomMutation, zCustomQuery } from 'convex-helpers/server/zod';

export const query = zCustomQuery(baseQuery, NoOp);
export const authQuery = zCustomQuery(
  baseQuery,
  customCtx(async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError('Unauthenticated');
    }

    return { user };
  })
);
export const mutation = zCustomMutation(baseMutation, NoOp);
export const authMutation = zCustomMutation(
  baseMutation,
  customCtx(async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError('Unauthenticated');
    }

    return { user };
  })
);
