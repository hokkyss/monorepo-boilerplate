interface EnvironmentVariable {
  NEXT_PRIVATE_APP_NAME: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

declare namespace NodeJS {
  declare interface ProcessEnv extends EnvironmentVariable {}
}
