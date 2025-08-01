import jwt from 'jsonwebtoken';

import type { AdminTokenPayload } from '~/types/types/admin.types';

export function verifyToken(token: string): AdminTokenPayload | null {
  try {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
    return decoded;
  } catch {
    return null;
  }
}
