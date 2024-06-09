'use client';

import type { PropsWithChildren } from 'react';

import { QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';

import queryClient from '../../configs/react-query/react-query.config';

export default function QueryClientProvider(props: PropsWithChildren) {
  const { children } = props;

  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
}
