/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as comments_models from "../comments/models.js";
import type * as comments_queries from "../comments/queries.js";
import type * as shared from "../shared.js";
import type * as todos_models from "../todos/models.js";
import type * as todos_queries from "../todos/queries.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "comments/models": typeof comments_models;
  "comments/queries": typeof comments_queries;
  shared: typeof shared;
  "todos/models": typeof todos_models;
  "todos/queries": typeof todos_queries;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
