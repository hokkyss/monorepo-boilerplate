import 'server-only';

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const envConfig = createEnv({
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_GITHUB_CLIENT_ID: process.env.AUTH_GITHUB_CLIENT_ID,
    AUTH_GITHUB_CLIENT_SECRET: process.env.AUTH_GITHUB_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_GITHUB_CLIENT_ID: z.string(),
    AUTH_GITHUB_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
  },
  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: false,
});

export default envConfig;
