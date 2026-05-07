import * as util from 'util';

describe('Config API Route (GET)', () => {
  let GET: any;
  let nextServer: any;
  const OLD_ENV = process.env;

  beforeAll(async () => {
    if (typeof global.Request === 'undefined') {
      (global as any).Request = class {
        constructor(public input: any) {}
      } as any;
      (global as any).Response = class {} as any;
      (global as any).TextEncoder = util.TextEncoder;
      (global as any).TextDecoder = util.TextDecoder;
    }

    nextServer = await import('next/server');
    nextServer.NextResponse.json = jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status || 200,
      _testData: data
    }));

    const routeModule = await import('./route');
    GET = routeModule.GET;
  });

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return turnstileSiteKey from process.env', async () => {
    process.env.TURNSTILE_SITE_KEY = 'test-key-123';

    const res = await GET();

    expect(res._testData).toEqual({ turnstileSiteKey: 'test-key-123' });
    expect(res.status).toBe(200);
  });
});
