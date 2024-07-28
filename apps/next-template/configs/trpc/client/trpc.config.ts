/** type-only import */
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '../server/server';

import { createTRPCReact } from '@trpc/react-query';

export const trpcConfig = createTRPCReact<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export default trpcConfig;
