import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { Language } from './configs/i18n/i18n.config';

export default function middleware(req: NextRequest) {
  return createMiddleware({
    // Used when no locale matches
    defaultLocale: Language.EN,

    // A list of all locales that are supported
    locales: Object.values(Language),
  })(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', `/(en|ja|id)/:path*`],
};
