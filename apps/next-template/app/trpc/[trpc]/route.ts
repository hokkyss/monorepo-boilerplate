import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import envConfig from '../../../configs/env/env.config';
import { appRouter } from '../../../configs/trpc/server/server';
import { createTRPCContext } from '../../../configs/trpc/server/trpc';

const handler = (req: Request) =>
  fetchRequestHandler({
    createContext: () => createTRPCContext({ headers: req.headers }),
    endpoint: '/trpc',
    onError:
      envConfig.NODE_ENV === 'development'
        ? ({ error, path }) => {
            // NOTE: logs error
            // eslint-disable-next-line no-console
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
          }
        : undefined,
    req,
    router: appRouter,
  });

export { handler as GET, handler as POST };
