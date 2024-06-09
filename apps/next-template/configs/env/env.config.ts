/**
 * Environment variables shared between client and server
 */
const envConfig = {
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  // isVercel: !!process.env.NEXT_PUBLIC_VERCEL_ENV,
};

export default envConfig;
