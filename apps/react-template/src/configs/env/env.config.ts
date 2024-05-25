const envConfig = {
  appPrefix: process.env.VITE_APP_PREFIX,
  env: process.env.NODE_ENV,
} as const;

export default envConfig;
