import 'server-only';

import type { Session, User } from 'lucia';

import { cookies } from 'next/headers';
import { cache } from 'react';

import authConfig from '../../configs/auth/auth.config';

export const getSession = cache(async (): Promise<{ session: Session; user: User } | null> => {
  const sessionId = cookies().get(authConfig.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return null;
  }

  const result = await authConfig.validateSession(sessionId);

  if (result.user === null || result.session === null) {
    return null;
  }

  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session?.fresh) {
      const sessionCookie = authConfig.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = authConfig.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}

  return result;
});
