import 'server-only';

import { PrismaClient } from '@prisma/client';

import envConfig from '../env/env.config';

const createPrismaClient = () =>
  new PrismaClient({
    log: envConfig.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

const databaseConfig = globalForPrisma.prisma ?? createPrismaClient();

if (envConfig.NODE_ENV !== 'production') {
  globalForPrisma.prisma = databaseConfig;
}

export default databaseConfig;
