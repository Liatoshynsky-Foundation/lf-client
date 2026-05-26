import jwt from 'jsonwebtoken';

import { AuthTokenPayload } from '~/types/types/admin.types';

import { jwtSecret } from '~/config';
import logger from '~/middleware/logger/logger';

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  if (!jwtSecret) {
    logger.error('[AUTH:JWT] Critical configuration error: JWT_SECRET is not defined in environment variables.');
    return null;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded as AuthTokenPayload;
  } catch (error: unknown) {
    const err = error as { name?: string; message?: string; expiredAt?: string };

    if (err.name === 'TokenExpiredError') {
      logger.warn(`[AUTH:JWT] Token expired at ${err.expiredAt ?? 'unknown time'}`);
    } else if (err.name === 'JsonWebTokenError') {
      logger.warn(`[AUTH:JWT] Invalid token signature or malformed token: ${err.message ?? 'no message'}`);
    } else {
      logger.warn('[AUTH:JWT] Unknown token verification error', { message: err.message ?? String(error) });
    }

    return null;
  }
}
