interface EnvironmentVariable {
  /**
   * Example private environment variable
   */
  NEXT_PRIVATE_APP_NAME: string;
  /**
   * Will be defined by vercel
   *
   * @see {@link https://vercel.com/docs/projects/environment-variables/system-environment-variables#framework-environment-variables}
   */
  NEXT_PUBLIC_VERCEL_ENV: string | undefined;
  NODE_ENV: 'development' | 'production' | 'test';
}

declare namespace NodeJS {
  declare interface ProcessEnv extends EnvironmentVariable {}
}
