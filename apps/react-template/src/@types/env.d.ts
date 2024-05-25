interface EnvironmentVariable {
  NODE_ENV: 'development' | 'production' | 'test';
  VITE_APP_PREFIX: string;
}

declare namespace NodeJS {
  declare interface ProcessEnv extends EnvironmentVariable {}
}

declare interface ImportMetaEnv extends EnvironmentVariable {}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
