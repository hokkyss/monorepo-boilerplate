import 'server-only';

import type { DefaultSession } from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import databaseConfig from '../database/database.config';
import envConfig from '../env/env.config';
import serverEnvConfig from '../env/env.config.server';

const authConfig = NextAuth({
  adapter: PrismaAdapter(databaseConfig),
  basePath: '/auth',
  callbacks: {
    session({ session, user }) {
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          // TODO: add user fields
        },
      };
    },
  },
  debug: envConfig.NODE_ENV === 'development',
  providers: [],
  secret: serverEnvConfig.AUTH_SECRET,
});

export default authConfig;

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    // ...other properties
    // role: UserRole;
  }

  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session extends DefaultSession {
    user: {
      // TODO: additional user fields
      id: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }
}
