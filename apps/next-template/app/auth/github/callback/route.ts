import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import authProviderConfig from '../../../../configs/auth/auth-provider.config';
import authConfig from '../../../../configs/auth/auth.config';
import dbConfig from '../../../../configs/db/db.config';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('github_oauth_state')?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await authProviderConfig.github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const githubUser: GitHubUser = await githubUserResponse.json();

    // Replace this with your own DB client.
    const existingUser = await dbConfig.user.findFirst({
      where: {
        githubId: githubUser.id.toString(),
      },
    });

    if (existingUser) {
      const session = await authConfig.createSession(existingUser.id, {});
      const sessionCookie = authConfig.createSessionCookie(session.id);

      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

      return new Response(null, {
        headers: {
          Location: '/',
        },
        status: 302,
      });
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    // Replace this with your own DB client.
    await dbConfig.user.create({
      data: {
        githubId: githubUser.id.toString(),
        id: userId,
        username: githubUser.login,
      },
    });

    const session = await authConfig.createSession(userId, {});
    const sessionCookie = authConfig.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response(null, {
      headers: {
        Location: '/',
      },
      status: 302,
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return NextResponse.json(
        { detail: e.message },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      { detail: 'Internal Server Error' },
      {
        status: 500,
      },
    );
  }
}

interface GitHubUser {
  id: number;
  login: string;
}
