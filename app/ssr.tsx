/// <reference types="vinxi/types/server" />
import { createClerkHandler } from '@clerk/tanstack-start/server'
import { createStartHandler, defaultStreamHandler } from '@tanstack/start/server'
import { getRouterManifest } from '@tanstack/start/router-manifest'

import { createRouter } from './router'

// export default createClerkHandler(
//   createStartHandler({
//     createRouter,
//     getRouterManifest,
//   }),
// )(defaultStreamHandler)

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
