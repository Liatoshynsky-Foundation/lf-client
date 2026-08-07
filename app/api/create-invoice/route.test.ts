const mockConsume = jest.fn();

jest.mock('rate-limiter-flexible', () => ({
  RateLimiterMemory: jest.fn().mockImplementation(() => ({
    consume: mockConsume
  }))
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-123')
}));

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: jest.fn((errors, status) => ({ _testErrors: errors, status }))
}));

jest.mock('~/config', () => ({
  WayForPay: {
    MERCHANT_ACCOUNT: 'test_acc',
    DOMAIN_NAME: 'https://test.com',
    MERCHANT_SECRET_KEY: 'secret'
  }
}));

const mockCreateDonationOrder = jest.fn();

jest.mock('~/infrastructure/repositories/way-for-pay/donationOrder.repository', () => ({
  __esModule: true,
  default: () => ({
    create: mockCreateDonationOrder,
    findByOrderReference: jest.fn(),
    updateStatus: jest.fn()
  })
}));

describe('Create Invoice API Route (POST)', () => {
  let POST: any;
  let nextServer: any;

  beforeAll(async () => {
    if (typeof global.Request === 'undefined') {
      (global as any).Request = class {
        constructor(public input: string) {
          this.json = async () => JSON.parse(input);
        }
        json: () => Promise<any>;
        headers = { get: jest.fn() };
      } as any;
      (global as any).Response = class {} as any;
    }

    nextServer = await import('next/server');
    nextServer.NextResponse.json = jest.fn((data) => ({ _testData: data, status: 200 }));

    const routeModule = await import('./route');
    POST = routeModule.POST;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockConsume.mockImplementation(() => Promise.resolve({}));
    mockCreateDonationOrder.mockResolvedValue({});
  });

  it('should return 429 when rate limit exceeded', async () => {
    const { errorResponse } = await import('~/utils/apiResponse');

    mockConsume.mockRejectedValueOnce(new Error('Rate limit exceeded'));

    const mockReq = {
      headers: { get: () => '127.0.0.1' },
      json: async () => ({ amount: 100 })
    };

    const res = await POST(mockReq as any);

    expect(mockConsume).toHaveBeenCalled();
    expect(errorResponse).toHaveBeenCalledWith(['Too many requests'], 429);
    expect(res.status).toBe(429);
  });

  it('should cover line 17 (successful rate limit consumption)', async () => {
    mockConsume.mockResolvedValueOnce({ remainingPoints: 4 });

    const mockReq = {
      headers: { get: () => '127.0.0.2' },
      json: async () => ({ amount: 100 })
    };

    const res = await POST(mockReq as any);

    expect(mockConsume).toHaveBeenCalledWith('127.0.0.2');
    expect(res.status).toBe(200);
  });

  it('should handle missing IP by using empty string', async () => {
    const mockReq = {
      headers: { get: () => null },
      json: async () => ({ amount: 100 })
    };

    await POST(mockReq as any);

    expect(mockConsume).toHaveBeenCalledWith('unknown');
    expect(mockConsume).toHaveReturned();
  });

  it('should create invoice successfully with valid data', async () => {
    const mockReq = {
      headers: { get: () => '127.0.0.1' },
      json: async () => ({ amount: 500, lang: 'en' })
    };

    const res = await POST(mockReq as any);

    expect(mockConsume).toHaveBeenCalledWith('127.0.0.1');
    expect(res.status).toBe(200);
    expect(res._testData.amount).toBe(500);
    expect(mockCreateDonationOrder).toHaveBeenCalledWith({
      orderReference: 'DON-test-uuid-123',
      amount: 500,
      currency: 'UAH',
      language: 'EN',
      productName: ['Donation'],
      productCount: [1],
      productPrice: [500]
    });
  });

  it('should return 400 for invalid donation amount', async () => {
    const { errorResponse } = await import('~/utils/apiResponse');

    const mockReq = {
      headers: { get: () => '127.0.0.1' },
      json: async () => ({ amount: 0 })
    };

    const res = await POST(mockReq as any);

    expect(errorResponse).toHaveBeenCalledWith(['Invalid donation amount. Amount must be at least 1.'], 400);

    expect(res.status).toBe(400);
  });

  it('should handle default currency and UA language correctly', async () => {
    const mockReq = {
      headers: { get: () => '127.0.0.1' },
      json: async () => ({ amount: 100, lang: 'ua' })
    };

    const res = await POST(mockReq as any);

    expect(res._testData.currency).toBe('UAH');
    expect(res._testData.language).toBe('UA');
  });
});
