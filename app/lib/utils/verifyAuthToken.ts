import jwt from 'jsonwebtoken';

import { AuthTokenPayload } from '~/types/types/admin.types';

import { jwtSecret } from '~/config';

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret!);
    return decoded as AuthTokenPayload;
  } catch (error) {
    console.error('JWT verify error:', error);
    return null;
  }
}
