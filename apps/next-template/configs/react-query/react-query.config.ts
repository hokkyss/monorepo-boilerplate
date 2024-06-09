import type { QueryClientConfig } from '@tanstack/react-query';

import { QueryClient, defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    dehydrate: {
      shouldDehydrateQuery: (query) => query.state.status === 'pending' || defaultShouldDehydrateQuery(query),
    },
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
};

// const makeQueryClient = isServer
//   ? cache(() => new QueryClient(queryClientConfig))
//   : () => new QueryClient(queryClientConfig);
function makeQueryClient() {
  return new QueryClient(queryClientConfig);
}

let browserQueryClient: QueryClient | undefined;

export default function getQueryClient() {
  if (isServer) {
    // NOTE: Another alternative is to use a shared query client
    //       The benefit of this is that you can call getQueryClient()
    //       to get a hold of this client anywhere that gets called from a Server Component,
    //       including utility functions.
    //       The downside is that every time you call dehydrate(getQueryClient()),
    //       you serialize the entire queryClient, including queries that have already been serialized before
    //       and are unrelated to the current Server Component which is unnecessary overhead.
    // Next.js already dedupes requests that utilize fetch(),
    // but if you are using something else in your queryFn,
    // or if you use a framework that does not dedupe these requests automatically,
    // using a single queryClient as described above might make sense, despite the duplicated serialization.

    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
}
