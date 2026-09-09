import * as util from 'util';

jest.mock('~/middleware/logger/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  },
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  }
}));

jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn(),
        findOne: jest.fn()
      })
    })
  })),
  ObjectId: jest.fn().mockImplementation((id) => id)
}));

const mockFundsService = {
  getFunds: jest.fn(),
  getFundById: jest.fn(),
  getCaseById: jest.fn()
};

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: (key: string) => (key === 'fundsService' ? mockFundsService : {})
  }))
}));

describe('Funds API Route (GET)', () => {
  let GET: any;
  let nextServer: any;

  beforeAll(async () => {
    if (typeof global.Request === 'undefined') {
      (global as any).Request = class {
        constructor() {}
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

  it('should return dynamically numbered funds list in English when lang=en', async () => {
    const rawFunds = [{ id: 1, title: { uk: 'Заголовок', en: 'Title' } }];
    mockFundsService.getFunds.mockResolvedValue(rawFunds);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('lang=en') }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.success).toBe(true);
    expect(res._testData.data[0].number).toBe('Fund 1');
    expect(res._testData.data[0].title).toBe('Title');
  });

  it('should return dynamically numbered funds list in Ukrainian by default', async () => {
    const rawFunds = [{ id: 2, title: { uk: 'Особисті документи', en: 'Personal documents' } }];
    mockFundsService.getFunds.mockResolvedValue(rawFunds);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams() }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.success).toBe(true);
    expect(res._testData.data[0].number).toBe('Фонд 2');
    expect(res._testData.data[0].title).toBe('Особисті документи');
  });

  it('should fallback to empty string when title is missing in funds list (branch coverage)', async () => {
    const rawFunds = [{ id: 3 }];
    mockFundsService.getFunds.mockResolvedValue(rawFunds);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('lang=uk') }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.data[0].number).toBe('Фонд 3');
    expect(res._testData.data[0].title).toBe('');
  });

  it('should return case details by caseId', async () => {
    const mockCase = { _id: 'case123', name: 'Test Case' };
    mockFundsService.getCaseById.mockResolvedValue(mockCase);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('caseId=case123') }
    };

    const res = await GET(mockReq as any);

    expect(mockFundsService.getCaseById).toHaveBeenCalledWith('case123');
    expect(res._testData.data).toEqual(mockCase);
  });

  it('should return 404 when caseId is provided but case not found', async () => {
    mockFundsService.getCaseById.mockResolvedValue(null);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('caseId=not-exists') }
    };

    const res = await GET(mockReq as any);

    expect(mockFundsService.getCaseById).toHaveBeenCalledWith('not-exists');
    expect(res.status).toBe(404);
    expect(res._testData.success).toBe(false);
  });

  it('should return 404 when fundId is valid but fund not found', async () => {
    mockFundsService.getFundById.mockResolvedValue(null);
    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('id=999') }
    };

    const res = await GET(mockReq as any);

    expect(mockFundsService.getFundById).toHaveBeenCalledWith(999);
    expect(res.status).toBe(404);
    expect(res._testData.success).toBe(false);
  });

  it('should return translated fund details by fundId', async () => {
    const mockFund = {
      id: 10,
      title: { uk: 'Фонд 10 Назва', en: 'Fund 10 Title' }
    };
    mockFundsService.getFundById.mockResolvedValue(mockFund);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('id=10&lang=uk') }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.data.number).toBe('Фонд 10');
    expect(res._testData.data.title).toBe('Фонд 10 Назва');
  });

  it('should fallback to empty string when fund title is missing in details (branch coverage)', async () => {
    const mockFund = { id: 7 };
    mockFundsService.getFundById.mockResolvedValue(mockFund);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('id=7&lang=en') }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.data.number).toBe('Fund 7');
    expect(res._testData.data.title).toBe('');
  });

  it('should fallback to funds list if no ID matches query params', async () => {
    mockFundsService.getFunds.mockResolvedValue([]);
    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('something=else') }
    };

    const res = await GET(mockReq as any);
    expect(res._testData.success).toBe(true);
  });
  it('should return 400 for invalid fundId format', async () => {
    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('id=abc') }
    };

    const res = await GET(mockReq as any);
    expect(res.status).toBe(400);
    expect(res._testData.error).toMatchObject({ code: 'VALIDATION_ERROR' });
  });

  it('should return 500 on service failure', async () => {
    mockFundsService.getFunds.mockRejectedValue(new Error('DB Error'));
    const mockReq = { nextUrl: { searchParams: new URLSearchParams() } };

    const res = await GET(mockReq as any);

    expect(res.status).toBe(500);
    expect(res._testData.error).toMatchObject({ code: 'FUNDS_FETCH_FAILED' });
  });
});
