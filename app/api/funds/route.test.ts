import type { NextRequest } from 'next/server';
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

type FundsRouteHandler = typeof import('./route').GET;
type FundsRouteRequest = Parameters<FundsRouteHandler>[0];
type JsonResponsePayload<TData = unknown> = {
  success: boolean;
  data?: TData;
  error?: {
    code: string;
    message: string;
  };
};
type TestJsonResponse<TData = unknown> = Awaited<ReturnType<FundsRouteHandler>> & {
  _testData: JsonResponsePayload<TData>;
  status: number;
};

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
  let GET: FundsRouteHandler;

  const createRequest = (searchParams = ''): FundsRouteRequest =>
    ({
      nextUrl: {
        searchParams: new URLSearchParams(searchParams)
      }
    }) as NextRequest;

  const getResponse = async <TData = unknown>(searchParams = ''): Promise<TestJsonResponse<TData>> =>
    (await GET(createRequest(searchParams))) as TestJsonResponse<TData>;

  beforeAll(async () => {
    if (typeof globalThis.Request === 'undefined') {
      Object.defineProperty(globalThis, 'Request', {
        value: jest.fn()
      });
      Object.defineProperty(globalThis, 'Response', {
        value: jest.fn()
      });
      Object.defineProperty(globalThis, 'TextEncoder', {
        value: util.TextEncoder
      });
      Object.defineProperty(globalThis, 'TextDecoder', {
        value: util.TextDecoder
      });
    }

    const { NextResponse } = await import('next/server');
    jest.spyOn(NextResponse, 'json').mockImplementation((data?: unknown, init?: ResponseInit) => {
      const response = {
        json: async () => data,
        status: init?.status || 200,
        _testData: data
      };

      return response as unknown as ReturnType<typeof NextResponse.json>;
    });

    const routeModule = await import('./route');
    GET = routeModule.GET;
  });

  beforeEach(() => jest.clearAllMocks());

  it('should return published funds list when no params provided', async () => {
    const rawFunds = [{ id: 1, number: { uk: '№1', en: 'No.1' }, title: { uk: 'Заголовок', en: 'Title' } }];
    mockFundsService.getFunds.mockResolvedValue(rawFunds);

    const res = await getResponse<typeof rawFunds>('lang=en');

    expect(res._testData.success).toBe(true);
    expect(res._testData.data).toEqual(rawFunds);
  });

  it('should return case details by caseId', async () => {
    const mockCase = { _id: 'case123', name: 'Test Case' };
    mockFundsService.getCaseById.mockResolvedValue(mockCase);

    const res = await getResponse<typeof mockCase>('caseId=case123');

    expect(mockFundsService.getCaseById).toHaveBeenCalledWith('case123');
    expect(res._testData.data).toEqual(mockCase);
  });

  it('should return 404 when caseId is provided but case not found', async () => {
    mockFundsService.getCaseById.mockResolvedValue(null);

    const res = await getResponse('caseId=not-exists');

    expect(mockFundsService.getCaseById).toHaveBeenCalledWith('not-exists');
    expect(res.status).toBe(404);
    expect(res._testData.success).toBe(false);
  });

  it('should return 404 when fundId is valid but fund not found', async () => {
    mockFundsService.getFundById.mockResolvedValue(null);

    const res = await getResponse('id=999');

    expect(mockFundsService.getFundById).toHaveBeenCalledWith(999);
    expect(res.status).toBe(404);
    expect(res._testData.success).toBe(false);
  });

  it('should return fund details by fundId without flattening localized fields', async () => {
    const mockFund = {
      id: 5,
      number: { uk: 'Фонд 5', en: 'Fund 5' },
      title: { uk: 'Назва', en: 'Title' }
    };
    mockFundsService.getFundById.mockResolvedValue(mockFund);

    const res = await getResponse<typeof mockFund>('id=5');

    expect(mockFundsService.getFundById).toHaveBeenCalledWith(5);
    expect(res._testData.data).toEqual(mockFund);
  });

  it('should ignore lang while preserving the fund details DTO shape', async () => {
    const mockFund = {
      id: 10,
      number: { uk: 'Ф10', en: 'F10' },
      title: { uk: 'Заголовок', en: 'Title' }
    };
    mockFundsService.getFundById.mockResolvedValue(mockFund);

    const res = await getResponse<typeof mockFund>('id=10&lang=uk');

    expect(res._testData.data).toEqual(mockFund);
  });

  it('should return fund details when lang is missing', async () => {
    const mockFund = {
      id: 1,
      number: { uk: 'Українська', en: 'English' },
      title: { uk: 'Заголовок', en: 'Title' }
    };
    mockFundsService.getFundById.mockResolvedValue(mockFund);

    const res = await getResponse<typeof mockFund>('id=1');

    expect(res._testData.data).toEqual(mockFund);
  });

  it('should fallback to funds list if no ID matches query params', async () => {
    mockFundsService.getFunds.mockResolvedValue([]);

    const res = await getResponse('something=else');
    expect(res._testData.success).toBe(true);
  });

  it('should return 400 for invalid fundId format', async () => {
    const res = await getResponse('id=abc');

    expect(res.status).toBe(400);
    expect(res._testData.error).toMatchObject({ code: 'VALIDATION_ERROR' });
  });

  it('should return 400 for non-positive or fractional fundId values', async () => {
    const zeroIdRes = await getResponse('id=0');
    const fractionalIdRes = await getResponse('id=1.5');

    expect(zeroIdRes.status).toBe(400);
    expect(fractionalIdRes.status).toBe(400);
    expect(mockFundsService.getFundById).not.toHaveBeenCalled();
  });

  it('should return 500 on service failure', async () => {
    mockFundsService.getFunds.mockRejectedValue(new Error('DB Error'));

    const res = await getResponse();

    expect(res.status).toBe(500);
    expect(res._testData.error).toMatchObject({ code: 'FUNDS_FETCH_FAILED' });
  });
});
