import * as util from 'util';

const mockArtistryService = {
  getCompositionsYearRange: jest.fn(),
  getAllCategories: jest.fn(),
  getAllGenres: jest.fn()
};

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: (key: string) => (key === 'artistryService' ? mockArtistryService : {})
  }))
}));

jest.mock('~/lib/utils/translation/parseLocale', () => ({
  parseLocale: jest.fn(() => 'uk')
}));

describe('Compositions Filters Route (GET)', () => {
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

  it('should return combined filters data', async () => {
    mockArtistryService.getCompositionsYearRange.mockResolvedValue({ min: 1900, max: 2000 });
    mockArtistryService.getAllCategories.mockResolvedValue(['cat1']);
    mockArtistryService.getAllGenres.mockResolvedValue(['genre1']);

    const mockReq = { nextUrl: { searchParams: new URLSearchParams() } };
    const res: any = await GET(mockReq as any);

    expect(res._testData).toEqual({
      yearRange: { min: 1900, max: 2000 },
      genres: ['genre1'],
      categories: ['cat1']
    });
  });

  it('should handle errors and return 500', async () => {
    mockArtistryService.getCompositionsYearRange.mockRejectedValue(new Error());
    const res: any = await GET({ nextUrl: { searchParams: new URLSearchParams() } } as any);
    expect(res.status).toBe(500);
  });
});
