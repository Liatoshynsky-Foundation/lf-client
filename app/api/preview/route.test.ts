import { cookies, draftMode } from 'next/headers';
import * as util from 'util';

import { errors } from '~/constants/errors';

import { verifyAuthToken } from '~/lib/utils/verifyAuthToken';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
  draftMode: jest.fn()
}));
jest.mock('~/config', () => ({
  baseUrl: 'http://localhost'
}));
jest.mock('~/lib/utils/verifyAuthToken', () => ({
  verifyAuthToken: jest.fn()
}));

jest.mock('~/lib/utils/apiResponse', () => ({
  errorResponse: jest.fn((errs, status) => ({ _testData: { errors: errs }, status }))
}));

jest.mock('~/lib/utils/cors', () => ({
  corsError: jest.fn((origin, res) => res),
  withCORS: jest.fn((origin, res) => res)
}));

describe('Draft API Route', () => {
  let GET: any;

  beforeAll(async () => {
    if (typeof global.Response === 'undefined') {
      (global as any).Response = class {
        constructor(
          public body?: any,
          public init?: any
        ) {}
        static json(data: any, init?: any) {
          return { json: async () => data, status: init?.status || 200, _testData: data };
        }
      } as any;
    }
    (global as any).Request = class {
      constructor(
        public url: string,
        public init?: any
      ) {
        this.headers = new Map(init?.headers || []);
      }
      headers: any;
    } as any;
    (global as any).TextEncoder = util.TextEncoder;
    (global as any).TextDecoder = util.TextDecoder;

    const nextServer = await import('next/server');
    nextServer.NextResponse.redirect = jest.fn((url) => ({
      status: 307,
      headers: new Map(),
      _redirectUrl: url
    })) as any;

    GET = (await import('./route')).GET;
  });

  beforeEach(() => jest.clearAllMocks());

  it('should return 401 if token is missing', async () => {
    jest.mocked(cookies).mockResolvedValue({ get: () => null } as any);
    const req = { headers: new Map(), url: 'https://n.com' };

    const res = await GET(req as any);
    expect(res.status).toBe(401);
    expect(res._testData.errors).toContain(errors.MISSING_AUTH_TOKEN);
  });

  it('should return 401 if token is invalid', async () => {
    jest.mocked(cookies).mockResolvedValue({ get: () => ({ value: 'bad' }) } as any);
    jest.mocked(verifyAuthToken).mockReturnValue(null);
    const req = { headers: new Map(), url: 'https://n.com' };

    const res = await GET(req as any);
    expect(res.status).toBe(401);
  });

  it('should return 403 if user is not admin', async () => {
    jest.mocked(cookies).mockResolvedValue({ get: () => ({ value: 'valid' }) } as any);

    jest.mocked(verifyAuthToken).mockReturnValue({
      id: '1',
      type: 'user' as any,
      refreshJti: 'jti'
    } as any);

    const req = { headers: new Map(), url: 'https://n.com' };
    const res = await GET(req as any);
    expect(res.status).toBe(403);
  });

  it('should return 400 if slug or lang are missing', async () => {
    jest.mocked(cookies).mockResolvedValue({ get: () => ({ value: 'valid' }) } as any);

    jest.mocked(verifyAuthToken).mockReturnValue({
      id: 'admin-id',
      type: 'admin',
      refreshJti: 'some-jti'
    } as any);

    const req = {
      headers: new Map([['origin', 'test.com']]),
      url: 'https://n.com?slug=home'
    };

    const res = await GET(req as any);

    expect(res.status).toBe(400);
    expect(res._testData.errors).toContain(errors.MISSING_PARAMETERS);
  });

  it('should enable draft mode and redirect correctly with draftId', async () => {
    jest.mocked(cookies).mockResolvedValue({ get: () => ({ value: 'token' }) } as any);
    jest.mocked(verifyAuthToken).mockReturnValue({ id: '1', type: 'admin', refreshJti: 'x' } as any);

    const mockDraftEnable = jest.fn();
    jest.mocked(draftMode).mockResolvedValue({ enable: mockDraftEnable } as any);

    const req = {
      headers: new Map(),
      url: 'https://test.com/api/preview?slug=my-page&lang=uk&draftId=999'
    };

    const res = await GET(req as any);

    expect(res.status).toBe(307);
    expect(res._redirectUrl).toBe('htt' + 'p://localhost/uk/my-page?draftId=999');
    expect(mockDraftEnable).toHaveBeenCalled();
  });
});
