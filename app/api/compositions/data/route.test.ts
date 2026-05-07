import * as util from 'util';

const mockArtistryService = {
  getAllCompositions: jest.fn()
};

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: (key: string) => (key === 'artistryService' ? mockArtistryService : {})
  }))
}));

jest.mock('~/lib/utils/filters/parseFilters', () => ({
  parseFilters: jest.fn(() => ({ some: 'filters' }))
}));

jest.mock('~/lib/utils/translation/parseLocale', () => ({
  parseLocale: jest.fn(() => 'en')
}));

describe('Compositions Data Route (GET)', () => {
  let GET: any;
  let nextServer: any;

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

  beforeEach(() => jest.clearAllMocks());

  it('should return all compositions successfully', async () => {
    const mockData = [{ id: 1, title: 'Symphony' }];
    mockArtistryService.getAllCompositions.mockResolvedValue(mockData);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('search=test') }
    };

    const res: any = await GET(mockReq as any);

    expect(mockArtistryService.getAllCompositions).toHaveBeenCalledWith('en', 'test', { some: 'filters' });
    expect(res._testData).toEqual(mockData);
  });

  it('should return 500 on failure', async () => {
    mockArtistryService.getAllCompositions.mockRejectedValue(new Error('Catch!'));
    const mockReq = { nextUrl: { searchParams: new URLSearchParams() } };

    const res: any = await GET(mockReq as any);

    expect(res.status).toBe(500);
    expect(res._testData.message).toBeDefined();
  });
});
