import jwt from 'jsonwebtoken';

import { AuthTokenPayload } from '~/types/types/admin.types';

import { jwtSecret } from '~/config';

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    const JWT_SECRET = jwtSecret!;
    const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    return decoded;
  } catch {
    return null;
  }
}
