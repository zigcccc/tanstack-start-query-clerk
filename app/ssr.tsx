/// <reference types="vinxi/types/server" />
import { createClerkHandler } from '@clerk/tanstack-start/server';
import { getRouterManifest } from '@tanstack/start/router-manifest';
import { createStartHandler, defaultStreamHandler } from '@tanstack/start/server';

import { createRouter } from './router';

// export default createClerkHandler(
//   createStartHandler({
//     createRouter,
//     getRouterManifest,
//   })
// )(defaultStreamHandler);

// export default createStartHandler({
//   createRouter,
//   getRouterManifest,
// })(defaultStreamHandler);

const handler = createStartHandler({
  createRouter,
  getRouterManifest,
});

const clerkHandler = createClerkHandler(handler);

export default clerkHandler(defaultStreamHandler);
