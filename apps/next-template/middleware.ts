import { verifyRequestOrigin } from 'lucia';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

import { Language } from './configs/i18n/i18n.config';

export default function middleware(req: NextRequest) {
  const intlMiddleware = createMiddleware({
    // Used when no locale matches
    defaultLocale: Language.EN,

    // A list of all locales that are supported
    locales: Object.values(Language),
  });

  if (req.method === 'GET') {
    return intlMiddleware(req);
  }

  const originHeader = req.headers.get('Origin');
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = req.headers.get('Host') ?? req.headers.get('X-Forwarded-Host');

  if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', `/(en|ja|id)/:path*`],
};
