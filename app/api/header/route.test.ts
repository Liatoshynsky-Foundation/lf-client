import * as util from 'util';
import { ZodError } from 'zod';

import { ResponseError } from '~/shared/exceptions/errors/responseError';
const mockHeaderService = {
  getHeaderData: jest.fn()
};

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: () => mockHeaderService
  }))
}));

jest.mock('~/middleware/logger/logger', () => ({
  error: jest.fn()
}));

describe('Header API Route', () => {
  let GET: any;

  beforeAll(async () => {
    if (typeof global.Request === 'undefined') {
      (global as any).Request = class {
        constructor() {}
      } as any;
      (global as any).Response = class {
        constructor() {}
      } as any;
      (global as any).TextEncoder = util.TextEncoder;
      (global as any).TextDecoder = util.TextDecoder;
    }

    const nextServer = await import('next/server');

    nextServer.NextResponse.json = jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status || 200,
      _testData: data
    })) as any;

    const routeModule = await import('./route');
    GET = routeModule.GET;
  });

  beforeEach(() => jest.clearAllMocks());

  it('should return header data successfully', async () => {
    mockHeaderService.getHeaderData.mockResolvedValue({ logo: 'test.png' });
    const req = {
      nextUrl: { searchParams: new URLSearchParams('locale=en') }
    };

    const res = await GET(req as any);
    expect(res.status).toBe(200);
    expect(res._testData.logo).toBe('test.png');
  });

  it('should fallback to "uk" locale if not provided', async () => {
    mockHeaderService.getHeaderData.mockResolvedValue({});
    const req = { nextUrl: { searchParams: new URLSearchParams('') } };

    await GET(req as any);
    expect(mockHeaderService.getHeaderData).toHaveBeenCalledWith('uk');
  });

  it('should handle ZodError (400)', async () => {
    const zodError = new ZodError([]);
    mockHeaderService.getHeaderData.mockRejectedValue(zodError);
    const req = { nextUrl: { searchParams: new URLSearchParams() } };

    const res = await GET(req as any);
    expect(res.status).toBe(400);
    expect(res._testData.code).toBe('VALIDATION_ERROR');
  });

  it('should handle ResponseError (502)', async () => {
    const errorPayload = {
      code: 'EXTERNAL_ERROR',
      message: 'Fail',
      details: {}
    };
    const respError = new ResponseError(errorPayload as any);

    mockHeaderService.getHeaderData.mockRejectedValue(respError);
    const req = { nextUrl: { searchParams: new URLSearchParams() } };

    const res = await GET(req as any);
    expect(res.status).toBe(502);
    expect(res._testData.code).toBe('EXTERNAL_ERROR');
  });
  it('should handle generic error (500)', async () => {
    mockHeaderService.getHeaderData.mockRejectedValue(new Error('Boom'));
    const req = { nextUrl: { searchParams: new URLSearchParams() } };

    const res = await GET(req as any);
    expect(res.status).toBe(500);
    expect(res._testData.code).toBe('SERVER_ERROR');
  });
});
