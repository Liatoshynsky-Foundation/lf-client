namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
    MONGO_DB: string;
    MONGO_HOST: string;
    MONGO_PORT: number;
    AZURE_SAS_URL: string;
    MERCHANT_ACCOUNT: string;
    MERCHANT_SECRET_KEY: string;
    DOMAIN_NAME: string;
    TURNSTILE_SECRET_KEY: string;
    VERIFY_URL: string;
    TURNSTILE_SITE_KEY: string;
  }
}
