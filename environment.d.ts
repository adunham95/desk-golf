declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGO_URL: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        DB_NAME: string;
        COOKIE_SIGNATURE: string;
        JWT_SIGNATURE: string;
      }
    }
  }
