/**
 * Environment variables shared between client and server
 */
const envConfig = {
  env: process.env.NODE_ENV,
  isVercel: process.env.NEXT_PUBLIC_VERCEL_ENV,
};

export default envConfig;
