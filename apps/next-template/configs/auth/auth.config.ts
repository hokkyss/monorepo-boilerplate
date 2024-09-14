import 'server-only';

import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { Lucia } from 'lucia';

import dbConfig from '../db/db.config';
import envConfig from '../env/env.config.server';

declare module 'lucia' {
  interface Register {
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
    Lucia: typeof authConfig;
  }

  interface DatabaseSessionAttributes {}

  interface DatabaseUserAttributes {
    github_id: number;
    username: string;
  }
}

const adapter = new PrismaAdapter(dbConfig.session, dbConfig.user);

const authConfig = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username,
    };
  },
  sessionCookie: {
    attributes: {
      secure: envConfig.NODE_ENV === 'production',
    },
    expires: false,
  },
});

export default authConfig;
