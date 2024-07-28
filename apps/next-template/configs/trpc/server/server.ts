import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { headers } from 'next/headers';
import { cache } from 'react';

import getQueryClient from '../../react-query/react-query.config';
import { userRouter } from '../server/routers/user.router';

import { createCallerFactory, createTRPCContext, createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createServerComponentContext = cache(() => {
  const requestHeader = new Headers(headers());

  requestHeader.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: requestHeader,
  });
});

const caller = createCaller(createServerComponentContext);

export const { HydrateClient, trpc } = createHydrationHelpers<AppRouter>(caller, getQueryClient);
