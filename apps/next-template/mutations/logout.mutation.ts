'use server';

import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import authConfig from '../configs/auth/auth.config';
import { getSession } from '../utils/auth/auth.util';

export default async function logout() {
  const session = await getSession();

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await authConfig.invalidateSession(session.session.id);

  const sessionCookie = authConfig.createBlankSessionCookie();

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect('/');
}
