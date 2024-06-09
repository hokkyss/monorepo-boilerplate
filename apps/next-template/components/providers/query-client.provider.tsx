/**
 * @see {@link https://tanstack.com/query/v5/docs/framework/react/guides/advanced-ssr}
 */
'use client';

// QueryClientProvider relies on useContext under the hood. This must be a client component
import type { PropsWithChildren } from 'react';

import { QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import envConfig from '../../configs/env/env.config';
import getQueryClient from '../../configs/react-query/react-query.config';

const Devtools = envConfig.isDev
  ? dynamic(() => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools))
  : () => null;

export default function QueryClientProvider(props: PropsWithChildren) {
  const { children } = props;

  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <Devtools />
    </TanstackQueryClientProvider>
  );
}
