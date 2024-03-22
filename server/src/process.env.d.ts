export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      SALT_ROUNDS: string;
      DEFAULT_USER_NAME: string;
      DEFAULT_USER_EMAIL: string;
      DEFAULT_USER_PASSWORD: string;
    }
  }
}
