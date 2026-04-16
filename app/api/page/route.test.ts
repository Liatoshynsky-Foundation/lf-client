import * as util from 'util';

import { errors } from '~/constants/errors';

import { isPageSlug } from '~/services/pages-data/schema-factory';

const mockPagesService = {
  getPageData: jest.fn()
};

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: () => mockPagesService
  }))
}));

jest.mock('~/services/pages-data/schema-factory', () => ({
  isPageSlug: jest.fn()
}));

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: jest.fn((errs, status = 400) => ({
    _testData: { errors: errs },
    status
  }))
}));

describe('Pages Data API Route', () => {
  let GET: any;

  beforeAll(async () => {
    if (typeof global.Response === 'undefined') {
      (global as any).Response = class {
        constructor(
          public body?: any,
          public init?: any
        ) {}
        static json(data: any, init?: any) {
          return {
            json: async () => data,
            status: init?.status || 200,
            _testData: data
          };
        }
      } as any;
    }
    if (typeof global.Request === 'undefined') {
      (global as any).Request = class {
        constructor(
          public url: string,
          public init?: any
        ) {}
      } as any;
    }

    (global as any).TextEncoder = util.TextEncoder;
    (global as any).TextDecoder = util.TextDecoder;
    const nextServer = await import('next/server');

    nextServer.NextResponse.json = (data: any, init?: any) => {
      return {
        json: async () => data,
        status: init?.status || 200,
        _testData: data
      } as any;
    };
    const routeModule = await import('./route');
    GET = routeModule.GET;
  });

  beforeEach(() => jest.clearAllMocks());

  it('should return 400 if Zod validation fails', async () => {
    const req = { url: 'http://localhost/api/pages?pageName=&lang=' };
    const res = await GET(req as any);

    expect(res.status).toBe(400);
  });

  it('should return 404 if isPageSlug returns false', async () => {
    jest.mocked(isPageSlug).mockReturnValue(false);

    const req = { url: 'http://localhost/api/pages?pageName=wrong-slug&lang=uk' };
    const res = await GET(req as any);

    expect(res.status).toBe(404);
    expect(res._testData.errors).toContain(errors.NOT_FOUND);
  });

  it('should return 404 if service returns no data', async () => {
    jest.mocked(isPageSlug).mockReturnValue(true);
    mockPagesService.getPageData.mockResolvedValue(null);

    const req = { url: 'http://localhost/api/pages?pageName=home&lang=uk' };
    const res = await GET(req as any);

    expect(res.status).toBe(404);
  });

  it('should return 200 and page data on success', async () => {
    const mockData = { title: 'Liatoshynsky Foundation' };
    jest.mocked(isPageSlug).mockReturnValue(true);
    mockPagesService.getPageData.mockResolvedValue(mockData);

    const req = { url: 'http://localhost/api/pages?pageName=home&lang=uk' };
    const res = await GET(req as any);

    expect(res.status).toBe(200);
    expect(res._testData).toEqual(mockData);
    expect(mockPagesService.getPageData).toHaveBeenCalledWith('home', 'uk');
  });
});
