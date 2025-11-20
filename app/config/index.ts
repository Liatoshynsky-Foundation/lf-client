export const mongoUrl = process.env.MONGO_URL;

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
