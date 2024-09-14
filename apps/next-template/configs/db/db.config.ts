import 'server-only';

import { PrismaClient } from '@prisma/client';

import envConfig from '../env/env.config.server';

const createPrismaClient = () =>
  new PrismaClient({
    log: envConfig.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

const dbConfig = createPrismaClient();

export default dbConfig;
