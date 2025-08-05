import jwt from 'jsonwebtoken';

import { AuthTokenPayload } from '~/types/types/admin.types';

import { jwtSecret } from '~/config';

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined');
    }
    const decoded = jwt.verify(token, jwtSecret);
    return decoded as AuthTokenPayload;
  } catch {
    return null;
  }
}
