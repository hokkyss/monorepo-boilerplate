import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(async () => {
    return { user: 'none' };
  }),
});
