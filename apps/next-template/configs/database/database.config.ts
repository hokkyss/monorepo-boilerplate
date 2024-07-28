import 'server-only';

import { PrismaClient } from '@prisma/client';

import envConfig from '../env/env.config';

const databaseConfig = new PrismaClient({
  log: envConfig.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default databaseConfig;
