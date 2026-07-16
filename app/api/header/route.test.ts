import * as util from 'util';

jest.mock('next/server', () => {
  if (typeof globalThis.Request === 'undefined') {
    class MockRequest {
      private readonly internalUrl: string;
      constructor(input: string) {
        this.internalUrl = input;
      }
      get url(): string {
        return this.internalUrl;
      }
    }
    class MockResponse {}
    Object.defineProperty(globalThis, 'Request', { value: MockRequest, writable: true });
    Object.defineProperty(globalThis, 'Response', { value: MockResponse, writable: true });
    Object.defineProperty(globalThis, 'TextEncoder', { value: util.TextEncoder, writable: true });
    Object.defineProperty(globalThis, 'TextDecoder', { value: util.TextDecoder, writable: true });
  }
  return {
    NextResponse: {
      json: jest.fn()
    }
  };
});

interface MockResponse {
  json: () => Promise<unknown>;
  status: number;
  _testData: Record<string, unknown>;
}

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
  let GET: (req: unknown) => Promise<unknown>;
  let ResponseError: new (payload: unknown) => Error & { code: string; details: unknown };

  beforeAll(async () => {
    const { NextResponse } = await import('next/server');
    NextResponse.json = jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status || 200,
      _testData: data as Record<string, unknown>
    })) as unknown as typeof NextResponse.json;

    const routeModule = await import('./route');
    GET = routeModule.GET as unknown as (req: unknown) => Promise<unknown>;

    const errorsModule = await import('~/shared/exceptions/errors/responseError');
    ResponseError = errorsModule.ResponseError as unknown as new (
      payload: unknown
    ) => Error & { code: string; details: unknown };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return header data successfully', async () => {
    mockHeaderService.getHeaderData.mockResolvedValue({ logo: 'test.png' });
    const req = {
      nextUrl: {
        searchParams: new URLSearchParams('locale=en')
      }
    };

    const res = (await GET(req)) as unknown as MockResponse;
    expect(res.status).toBe(200);
    expect(res._testData.logo).toBe('test.png');
  });

  it('should fallback to "uk" locale if not provided', async () => {
    mockHeaderService.getHeaderData.mockResolvedValue({});
    const req = {
      nextUrl: {
        searchParams: new URLSearchParams('')
      }
    };

    await GET(req);
    expect(mockHeaderService.getHeaderData).toHaveBeenCalledWith('uk');
  });

  it('should handle ZodError (400)', async () => {
    const { ZodError } = await import('zod');
    const zodError = new ZodError([]);
    mockHeaderService.getHeaderData.mockRejectedValue(zodError);
    const req = {
      nextUrl: {
        searchParams: new URLSearchParams()
      }
    };

    const res = (await GET(req)) as unknown as MockResponse;
    expect(res.status).toBe(400);
    expect(res._testData.code).toBe('VALIDATION_ERROR');
  });

  it('should handle ResponseError with default fallback code (502)', async () => {
    const errorPayload = {
      code: 'EXTERNAL_SERVICE_FAIL',
      message: 'Fail text message',
      details: {}
    };
    const respError = new ResponseError(errorPayload);

    mockHeaderService.getHeaderData.mockRejectedValue(respError);
    const req = {
      nextUrl: {
        searchParams: new URLSearchParams()
      }
    };

    const res = (await GET(req)) as unknown as MockResponse;
    expect(res.status).toBe(502);
    expect(res._testData.code).toBe('EXTERNAL_SERVICE_FAIL');
  });

  it('should handle ResponseError with dynamic specific error status field provided (403)', async () => {
    const errorPayload = {
      code: 'FORBIDDEN_RESOURCE',
      message: 'Access is denied',
      details: {}
    };
    const respError = new ResponseError(errorPayload);
    Object.defineProperty(respError, 'status', { value: 403, writable: true });

    mockHeaderService.getHeaderData.mockRejectedValue(respError);
    const req = {
      nextUrl: {
        searchParams: new URLSearchParams()
      }
    };

    const res = (await GET(req)) as unknown as MockResponse;
    expect(res.status).toBe(403);
    expect(res._testData.code).toBe('FORBIDDEN_RESOURCE');
  });

  it('should handle generic server execution exceptions (500)', async () => {
    mockHeaderService.getHeaderData.mockRejectedValue(new Error('Fatal boom'));
    const req = {
      nextUrl: {
        searchParams: new URLSearchParams()
      }
    };

    const res = (await GET(req)) as unknown as MockResponse;
    expect(res.status).toBe(500);
    expect(res._testData.code).toBe('SERVER_ERROR');
  });
});
