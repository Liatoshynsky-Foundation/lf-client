import * as util from 'util';

// 1. Мокаем зависимости
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

  it('should return translated funds list when no params provided', async () => {
    const rawFunds = [{ id: 1, number: { uk: '№1', en: 'No.1' }, title: { uk: 'Заголовок', en: 'Title' } }];
    mockFundsService.getFunds.mockResolvedValue(rawFunds);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('lang=en') }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.success).toBe(true);
    expect(res._testData.data[0].number).toBe('No.1');
    expect(res._testData.data[0].title).toBe('Title');
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

  it('should return 404 when caseId is provided but case not found (Lines 34-35)', async () => {
    mockFundsService.getCaseById.mockResolvedValue(null);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('caseId=not-exists') }
    };

    const res = await GET(mockReq as any);

    expect(mockFundsService.getCaseById).toHaveBeenCalledWith('not-exists');
    expect(res.status).toBe(404);
    expect(res._testData.success).toBe(false);
  });
  it('should return 404 when fundId is valid but fund not found (Lines 59-61)', async () => {
    mockFundsService.getFundById.mockResolvedValue(null);
    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('id=999') }
    };

    const res = await GET(mockReq as any);

    expect(mockFundsService.getFundById).toHaveBeenCalledWith(999);
    expect(res.status).toBe(404);
    expect(res._testData.success).toBe(false);
  });
  it('should handle fund fields when they are NOT objects (Line 63-65)', async () => {
    const mockFund = {
      id: 5,
      number: 'SimpleNumber',
      title: 'SimpleTitle'
    };
    mockFundsService.getFundById.mockResolvedValue(mockFund);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('id=5') }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.data.number).toBe('SimpleNumber');
    expect(res._testData.data.title).toBe('SimpleTitle');
  });
  it('BRANCH COVERAGE: should handle mixed types for number and title (Lines 34, 64-65)', async () => {
    const mixedFunds = [
      {
        id: 1,
        number: { uk: 'Объект', en: 'Object' },
        title: 'Простая строка'
      },
      {
        id: 2,
        number: 'Простая строка',
        title: { uk: 'Объект', en: 'Object' }
      }
    ];

    mockFundsService.getFunds.mockResolvedValue(mixedFunds);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('lang=en') }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.data[0].number).toBe('Object');
    expect(res._testData.data[0].title).toBe('Простая строка');

    expect(res._testData.data[1].number).toBe('Простая строка');
    expect(res._testData.data[1].title).toBe('Object');
  });
  it('should return translated fund details by fundId', async () => {
    const mockFund = {
      id: 10,
      number: { uk: 'Ф10', en: 'F10' },
      title: 'Static Title'
    };
    mockFundsService.getFundById.mockResolvedValue(mockFund);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('id=10&lang=uk') }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.data.number).toBe('Ф10');
    expect(res._testData.data.title).toBe('Static Title');
  });
  it('should handle fund translation when lang is missing (default "uk")', async () => {
    const mockFund = {
      id: 1,
      number: { uk: 'Українська', en: 'English' },
      title: { uk: 'Заголовок', en: 'Title' }
    };
    mockFundsService.getFundById.mockResolvedValue(mockFund);

    const mockReq = {
      nextUrl: { searchParams: new URLSearchParams('id=1') }
    };

    const res = await GET(mockReq as any);

    expect(res._testData.data.number).toBe('Українська');
  });
  it('should fallback to funds list if no ID matches (Last lines)', async () => {
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
