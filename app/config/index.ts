export const getMongoUrl = (): string => {
  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB, MONGO_HOST, MONGO_PORT } = process.env;

  if (MONGO_HOST === 'localhost') {
    return `mongodb://${MONGO_HOST}:${MONGO_PORT ?? 27017}/${MONGO_DB}`;
  }
  return `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;
};

export const mongoUrl = getMongoUrl();

export const jwtSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

export const baseUrl = process.env.CLIENT_BASE_URL;

export const WayForPay = {
  MERCHANT_ACCOUNT: process.env.MERCHANT_ACCOUNT,
  MERCHANT_SECRET_KEY: process.env.MERCHANT_SECRET_KEY,
  DOMAIN_NAME: process.env.DOMAIN_NAME,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  VERIFY_URL: process.env.VERIFY_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
};
