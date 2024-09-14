import 'server-only';

import { GitHub } from 'arctic';

import envConfig from '../env/env.config.server';

const authProviderConfig = {
  github: new GitHub(envConfig.AUTH_GITHUB_CLIENT_ID, envConfig.AUTH_GITHUB_CLIENT_SECRET),
};

export default authProviderConfig;
