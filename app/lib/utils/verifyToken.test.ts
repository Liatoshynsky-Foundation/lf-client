import jwt from 'jsonwebtoken';

import { verifyToken } from './verifyToken';
import { AdminTokenPayload } from '~/types/types/admin.types';

jest.mock('jsonwebtoken');

const mockVerify = jest.mocked(jwt.verify);

const fakeToken = 'fake.jwt.token';
const JWT_SECRET = 'secret_token';
const validPayload: AdminTokenPayload = {
  id: 'admin-id',
  type: 'superadmin',
  refreshJti: 'refresh-token-id'
};

describe('verifyToken', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = JWT_SECRET;
    jest.clearAllMocks();
  });

  it('should return decoded payload when token is valid', () => {
    mockVerify.mockReturnValue(validPayload as any);

    const result = verifyToken(fakeToken);
    expect(jwt.verify).toHaveBeenCalledWith(fakeToken, JWT_SECRET);
    expect(result).toEqual(validPayload);
  });

  it('should return null when token is invalid', () => {
    mockVerify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const result = verifyToken(fakeToken);
    expect(result).toBeNull();
  });
});
