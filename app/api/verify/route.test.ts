import { WayForPay } from '~/config';

const mockError = jest.fn();
const mockSuccess = jest.fn();

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: (...args: any[]) => mockError(...args),
  successResponse: (...args: any[]) => mockSuccess(...args)
}));

global.fetch = jest.fn();

import { POST } from './route';

describe('Turnstile API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (WayForPay as any).TURNSTILE_SECRET_KEY = 'secret';
    (WayForPay as any).VERIFY_URL = 'https://verify.url';
  });

  it('should return 400 if token is missing', async () => {
    const req = { json: jest.fn().mockResolvedValue({}) };
    await POST(req as any);
    expect(mockError).toHaveBeenCalledWith(['missing-input']);
  });

  it('should return success if verification passes', async () => {
    const req = { json: jest.fn().mockResolvedValue({ token: 'abc' }) };

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true })
    });

    await POST(req as any);

    expect(global.fetch).toHaveBeenCalled();
    expect(mockSuccess).toHaveBeenCalledWith({ success: true });
  });

  it('should return error if verification fails', async () => {
    const req = { json: jest.fn().mockResolvedValue({ token: 'abc' }) };

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false })
    });

    await POST(req as any);

    expect(mockError).toHaveBeenCalledWith(['missing-input']);
  });
});
