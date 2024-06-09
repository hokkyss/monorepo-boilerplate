/** @type {import('next').NextConfig} */
module.exports = {
  basePath: '',
  cleanDistDir: true,
  crossOrigin: 'anonymous',
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  experimental: {
    fallbackNodePolyfills: false,
    gzipSize: true,
    instrumentationHook: false,
    ppr: false,
    scrollRestoration: true,
    serverActions: {},
    serverMinification: true,
    swcTraceProfiling: true,
    typedRoutes: true,
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
  },
  generateEtags: true,
  images: {},
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  poweredByHeader: true,
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  trailingSlash: false,
  transpilePackages: ['@monorepo/ui'],
  typescript: {
    ignoreBuildErrors: true,
  },
};
