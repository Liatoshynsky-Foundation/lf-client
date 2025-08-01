import jwt from 'jsonwebtoken';

import { verifyToken } from './verifyToken';
import { AdminTokenPayload } from '~/types/types/admin.types';

jest.mock('jsonwebtoken');
jest.mock('~/config', () => ({
  jwtSecret: 'secret_token'
}));

const mockVerify = jest.mocked(jwt.verify);

const fakeToken = 'fake.jwt.token';
const validPayload: AdminTokenPayload = {
  id: 'admin-id',
  type: 'superadmin',
  refreshJti: 'refresh-token-id'
};

describe('verifyToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return decoded payload when token is valid', () => {
    mockVerify.mockReturnValue(validPayload as any);

    const result = verifyToken(fakeToken);
    expect(jwt.verify).toHaveBeenCalledWith(fakeToken, 'secret_token');
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
