'use client';

import type { PropsWithChildren } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { useState } from 'react';
import SuperJSON from 'superjson';

import trpcConfig from '../../configs/trpc/client/trpc.config';

export default function TrpcClientProvider(props: PropsWithChildren) {
  const queryClient = useQueryClient();

  const [trpcClient] = useState(() =>
    trpcConfig.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchLink({
          headers: () => {
            return {
              'x-trpc-source': 'nextjs-react',
            };
          },
          transformer: SuperJSON,
          url: getBaseUrl() + '/trpc',
        }),
      ],
    }),
  );

  return (
    <trpcConfig.Provider client={trpcClient} queryClient={queryClient}>
      {props.children}
    </trpcConfig.Provider>
  );
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}
