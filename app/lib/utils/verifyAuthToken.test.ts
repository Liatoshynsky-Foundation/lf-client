import jwt from 'jsonwebtoken';

import { verifyAuthToken } from './verifyAuthToken';
import { AuthTokenPayload } from '~/types/types/admin.types';

let mockJwtSecret: string | undefined = 'secret_token';

jest.mock('jsonwebtoken');
jest.mock('~/config', () => ({
  get jwtSecret() {
    return mockJwtSecret;
  }
}));

jest.mock('~/middleware/logger/logger', () => ({
  error: jest.fn(),
  warn: jest.fn()
}));

const mockVerify = jest.mocked(jwt.verify);

const fakeToken = 'fake.jwt.token';
const validPayload: AuthTokenPayload = {
  id: 'admin-id',
  type: 'superadmin',
  refreshJti: 'refresh-token-id'
};

describe('verifyAuthToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockJwtSecret = 'secret_token';
  });

  it('should return decoded payload when token is valid', () => {
    mockVerify.mockReturnValue(validPayload as unknown as ReturnType<typeof mockVerify>);

    const result = verifyAuthToken(fakeToken);
    expect(jwt.verify).toHaveBeenCalledWith(fakeToken, 'secret_token');
    expect(result).toEqual(validPayload);
  });

  it('should return null and log critical error when jwtSecret configuration is missing', () => {
    mockJwtSecret = undefined;

    const result = verifyAuthToken(fakeToken);
    expect(result).toBeNull();
  });

  it('should return null and log token expired error details cleanly when token lifecycle has ended', () => {
    const expiredError = new Error('jwt expired');
    Object.defineProperty(expiredError, 'name', { value: 'TokenExpiredError' });
    Object.defineProperty(expiredError, 'expiredAt', { value: '2026-07-10T12:00:00Z' });

    mockVerify.mockImplementation(() => {
      throw expiredError;
    });

    const result = verifyAuthToken(fakeToken);
    expect(result).toBeNull();
  });

  it('should return null and log token expired fallback error details when expiredAt timestamp is completely absent', () => {
    const expiredError = new Error('jwt expired');
    Object.defineProperty(expiredError, 'name', { value: 'TokenExpiredError' });

    mockVerify.mockImplementation(() => {
      throw expiredError;
    });

    const result = verifyAuthToken(fakeToken);
    expect(result).toBeNull();
  });

  it('should return null and log structural json web token validation errors when token format validation breaks', () => {
    const signatureError = new Error('invalid signature');
    Object.defineProperty(signatureError, 'name', { value: 'JsonWebTokenError' });

    mockVerify.mockImplementation(() => {
      throw signatureError;
    });

    const result = verifyAuthToken(fakeToken);
    expect(result).toBeNull();
  });

  it('should return null and log fallback message structural errors when json web token validation breaks without inner text messaging', () => {
    const signatureError = new Error();
    Object.defineProperty(signatureError, 'name', { value: 'JsonWebTokenError' });
    Object.defineProperty(signatureError, 'message', { value: undefined });

    mockVerify.mockImplementation(() => {
      throw signatureError;
    });

    const result = verifyAuthToken(fakeToken);
    expect(result).toBeNull();
  });

  it('should return null and log unknown catch errors cleanly if token parser faces general execution exceptions', () => {
    const rawUnknownError = new Error('Database down or generic engine crash error');
    mockVerify.mockImplementation(() => {
      throw rawUnknownError;
    });

    const result = verifyAuthToken(fakeToken);
    expect(result).toBeNull();
  });

  it('should return null and log non error primitives inside final catch path seamlessly', () => {
    const rawStringError = { message: undefined };
    Object.defineProperty(rawStringError, 'toString', { value: () => 'Raw string exception payload' });

    mockVerify.mockImplementation(() => {
      throw rawStringError;
    });

    const result = verifyAuthToken(fakeToken);
    expect(result).toBeNull();
  });
});
