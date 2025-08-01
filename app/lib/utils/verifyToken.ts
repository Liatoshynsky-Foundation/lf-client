import jwt from 'jsonwebtoken';

import type { AdminTokenPayload } from '~/types/types/admin.types';

import { jwtSecret } from '~/config';

export function verifyToken(token: string): AdminTokenPayload | null {
  try {
    const JWT_SECRET = jwtSecret!;
    const decoded = jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
    return decoded;
  } catch {
    return null;
  }
}
