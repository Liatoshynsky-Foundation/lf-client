import type { NextRequest, NextResponse } from 'next/server';
import * as util from 'util';

const mockArtistryService = {
  getSearchAutocompleteOptions: jest.fn()
};

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: (key: string) => (key === 'artistryService' ? mockArtistryService : {})
  }))
}));

const mockFilters = {
  search: 'bach',
  categories: 'piano',
  years: { min: 1700, max: 1750 }
};

jest.mock('~/lib/utils/filters/parseFilters', () => ({
  parseFilters: jest.fn(() => mockFilters)
}));

const mockLocale = 'de';

jest.mock('~/lib/utils/translation/parseLocale', () => ({
  parseLocale: jest.fn(() => mockLocale)
}));

describe('Compositions Titles Route (GET)', () => {
  let GET: (req: NextRequest) => Promise<NextResponse>;
  let nextServer: typeof import('next/server');

  const originalGlobals = {
    Request: globalThis.Request,
    Response: globalThis.Response,
    TextEncoder: globalThis.TextEncoder,
    TextDecoder: globalThis.TextDecoder
  };

  beforeAll(async () => {
    if (typeof globalThis.Request === 'undefined') {
      Object.assign(globalThis, {
        Request: class MockRequest {
          constructor(
            public input: string | URL | Request,
            public init?: RequestInit
          ) {}
        }
      });
    }

    if (typeof globalThis.Response === 'undefined') {
      Object.assign(globalThis, {
        Response: class MockResponse {
          constructor(
            public body?: BodyInit | null,
            public init?: ResponseInit
          ) {}
        }
      });
    }

    if (typeof globalThis.TextEncoder === 'undefined') {
      Object.assign(globalThis, {
        TextEncoder: util.TextEncoder,
        TextDecoder: util.TextDecoder
      });
    }

    nextServer = await import('next/server');
    nextServer.NextResponse.json = jest.fn(
      (data: unknown, init?: ResponseInit) =>
        ({
          json: async () => data,
          status: init?.status || 200,
          _testData: data
        }) as unknown as NextResponse
    ) as unknown as typeof nextServer.NextResponse.json;

    const routeModule = await import('./route');
    GET = routeModule.GET;
  });

  beforeEach(() => jest.clearAllMocks());

  afterAll(() => {
    Object.assign(globalThis, originalGlobals);
  });

  it('should map filters and return titles', async () => {
    const mockSuggestions = [{ _id: '123', name: 'Bach Title', type: 'opus' }];
    mockArtistryService.getSearchAutocompleteOptions.mockResolvedValue(mockSuggestions);

    const req = { nextUrl: { searchParams: new URLSearchParams() } } as unknown as NextRequest;
    const res = (await GET(req)) as NextResponse & { _testData: { names: unknown } };

    expect(mockArtistryService.getSearchAutocompleteOptions).toHaveBeenCalledWith(mockLocale, {
      search: mockFilters.search,
      category: mockFilters.categories,
      yearFrom: mockFilters.years.min,
      yearTo: mockFilters.years.max
    });
    expect(res._testData.names).toEqual(mockSuggestions);
  });

  it('should handle service failure', async () => {
    mockArtistryService.getSearchAutocompleteOptions.mockRejectedValue(new Error());
    const req = { nextUrl: { searchParams: new URLSearchParams() } } as unknown as NextRequest;
    const res = await GET(req);
    expect(res.status).toBe(500);
  });
});
