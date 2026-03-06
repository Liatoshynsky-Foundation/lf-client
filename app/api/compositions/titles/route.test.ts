import * as util from 'util';

const mockArtistryService = {
  getAllCompositionTitles: jest.fn()
};

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: (key: string) => (key === 'artistryService' ? mockArtistryService : {})
  }))
}));

jest.mock('~/lib/utils/filters/parseFilters', () => ({
  parseFilters: jest.fn(() => ({
    search: 'bach',
    categories: 'piano',
    genres: 'baroque',
    years: { min: 1700, max: 1750 }
  }))
}));

jest.mock('~/lib/utils/translation/parseLocale', () => ({
  parseLocale: jest.fn(() => 'de')
}));

describe('Compositions Titles Route (GET)', () => {
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

  it('should map filters and return titles', async () => {
    mockArtistryService.getAllCompositionTitles.mockResolvedValue(['Bach Title']);

    const res: any = await GET({ nextUrl: { searchParams: new URLSearchParams() } } as any);

    expect(mockArtistryService.getAllCompositionTitles).toHaveBeenCalledWith('de', {
      search: 'bach',
      category: 'piano',
      genre: 'baroque',
      yearFrom: 1700,
      yearTo: 1750
    });
    expect(res._testData.titles).toEqual(['Bach Title']);
  });

  it('should handle service failure', async () => {
    mockArtistryService.getAllCompositionTitles.mockRejectedValue(new Error());
    const res: any = await GET({ nextUrl: { searchParams: new URLSearchParams() } } as any);
    expect(res.status).toBe(500);
  });
});
