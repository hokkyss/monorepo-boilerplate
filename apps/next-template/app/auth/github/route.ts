import { generateState } from 'arctic';
import { cookies } from 'next/headers';

import authProviderConfig from '../../../configs/auth/auth-provider.config';

export async function GET(): Promise<Response> {
  const state = generateState();
  const url = await authProviderConfig.github.createAuthorizationURL(state);

  cookies().set('github_oauth_state', state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return Response.redirect(url);
}
