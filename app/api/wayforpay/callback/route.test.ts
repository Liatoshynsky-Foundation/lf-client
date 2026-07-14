import type { NextRequest } from 'next/server';
import crypto from 'node:crypto';
import { TextDecoder, TextEncoder } from 'util';

function createSignature(
  overrides?: Partial<{
    orderReference: string;
    amount: number;
    currency: string;
    authCode: string;
    cardPan: string;
    transactionStatus: string;
    reasonCode: number;
  }>
) {
  const data = {
    orderReference: 'DON-1',
    amount: 100,
    currency: 'UAH',
    authCode: 'AUTH123',
    cardPan: '444455******1111',
    transactionStatus: 'Approved',
    reasonCode: 1100,
    ...overrides
  };

  return crypto
    .createHmac('md5', 'secret')
    .update(
      [
        'test_merch_n1',
        data.orderReference,
        data.amount,
        data.currency,
        data.authCode ?? '',
        data.cardPan ?? '',
        data.transactionStatus,
        data.reasonCode
      ].join(';'),
      'utf8'
    )
    .digest('hex');
}

const validPayload = {
  merchantAccount: 'test_merch_n1',
  orderReference: 'DON-1',
  amount: 100,
  currency: 'UAH',
  authCode: 'AUTH123',
  cardPan: '444455******1111',
  transactionStatus: 'Approved',
  reasonCode: 1100
};

const mockFindDonationOrder = jest.fn();
const mockUpdateDonationOrderStatus = jest.fn();
const mockCreatePaymentEventIfNotExists = jest.fn();

jest.mock('~/config', () => ({
  WayForPay: {
    MERCHANT_SECRET_KEY: 'secret'
  }
}));

jest.mock('~/services/way-for-pay/wayForPayService', () => ({
  createWayForPayService: jest.fn(() => ({
    findDonationOrder: mockFindDonationOrder,
    updateDonationOrderStatus: mockUpdateDonationOrderStatus,
    createPaymentEventIfNotExists: mockCreatePaymentEventIfNotExists
  }))
}));

jest.mock('~/infrastructure/repositories/way-for-pay/donationOrder.repository', () => ({
  __esModule: true,
  default: jest.fn(() => ({}))
}));

jest.mock('~/infrastructure/repositories/way-for-pay/paymentEvent.repository', () => ({
  __esModule: true,
  default: jest.fn(() => ({}))
}));

function createRequest(contentType: string, body: unknown): NextRequest {
  return {
    headers: {
      get: jest.fn(() => contentType)
    },
    json: jest.fn(async () => body)
  } as unknown as NextRequest;
}

type MockResponse = {
  json: () => Promise<unknown>;
  status: number;
  _testData: Record<string, unknown>;
};

type MockRouteHandler = (req: NextRequest) => Promise<MockResponse>;

describe('WayForPay Callback API Route (POST)', () => {
  let POST: MockRouteHandler;
  let nextServer: typeof import('next/server');

  beforeAll(async () => {
    if (typeof global.Request === 'undefined') {
      Object.defineProperty(global, 'Request', {
        value: class {
          constructor() {}
        },
        writable: true
      });

      Object.defineProperty(global, 'Response', {
        value: class {},
        writable: true
      });

      Object.defineProperty(global, 'TextEncoder', {
        value: TextEncoder,
        writable: true
      });

      Object.defineProperty(global, 'TextDecoder', {
        value: TextDecoder,
        writable: true
      });
    }

    nextServer = await import('next/server');

    type MockJsonFn = (data: unknown, init?: { status?: number }) => MockResponse;

    (nextServer.NextResponse.json as unknown as MockJsonFn) = jest.fn((data: unknown, init?: { status?: number }) => ({
      json: async () => data,
      status: init?.status ?? 200,
      _testData: data as Record<string, unknown>
    }));

    const routeModule = await import('./route');
    POST = routeModule.POST as unknown as MockRouteHandler;
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockFindDonationOrder.mockResolvedValue({
      orderReference: 'DON-1',
      amount: 100,
      currency: 'UAH'
    });

    mockUpdateDonationOrderStatus.mockResolvedValue(undefined);
    mockCreatePaymentEventIfNotExists.mockResolvedValue(true);
  });

  it('should return 415 for unsupported media type', async () => {
    const req = createRequest('text/plain', {});

    const response = await POST(req);

    expect(response.status).toBe(415);

    const body = await response.json();

    expect(body).toEqual({
      error: 'unsupported media type'
    });
  });

  it('should return 400 for invalid payload', async () => {
    const req = createRequest('application/json', {});

    const response = await POST(req);

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body).toEqual({
      error: 'bad payload'
    });
  });

  it('should return 403 for invalid signature', async () => {
    const req = createRequest('application/json', {
      ...validPayload,
      merchantSignature: '12345678901234567890123456789012'
    });

    const response = await POST(req);

    expect(response.status).toBe(403);

    const body = await response.json();

    expect(body).toEqual({
      error: 'invalid signature'
    });
  });

  it('should return 404 when donation order is not found', async () => {
    mockFindDonationOrder.mockResolvedValue(null);

    const req = createRequest('application/json', {
      ...validPayload,
      merchantSignature: createSignature()
    });

    const response = await POST(req);

    expect(response.status).toBe(404);

    const body = await response.json();

    expect(body).toEqual({
      error: 'order not found'
    });
  });

  it('should return 422 when amount does not match', async () => {
    mockFindDonationOrder.mockResolvedValue({
      orderReference: 'DON-1',
      amount: 500,
      currency: 'UAH'
    });

    const req = createRequest('application/json', {
      ...validPayload,
      merchantSignature: createSignature()
    });

    const response = await POST(req);

    expect(response.status).toBe(422);

    const body = await response.json();

    expect(body).toEqual({
      error: 'amount/currency mismatch'
    });
  });

  it('should update donation order when payment is approved', async () => {
    const req = createRequest('application/json', {
      ...validPayload,
      merchantSignature: createSignature()
    });

    const res = await POST(req);

    expect(res.status).toBe(200);

    expect(mockFindDonationOrder).toHaveBeenCalledWith('DON-1');

    expect(mockUpdateDonationOrderStatus).toHaveBeenCalledWith(
      expect.objectContaining({
        orderReference: 'DON-1',
        status: 'Paid',
        paymentProvider: 'WayForPay',
        providerTxnId: 'AUTH123',
        paidAt: expect.any(Date)
      })
    );
  });

  it('should update donation order without payment info when payment is declined', async () => {
    const req = createRequest('application/json', {
      ...validPayload,
      transactionStatus: 'Declined',
      merchantSignature: createSignature({
        transactionStatus: 'Declined'
      })
    });

    const res = await POST(req);

    expect(res.status).toBe(200);

    expect(mockUpdateDonationOrderStatus).toHaveBeenCalledWith(
      expect.objectContaining({
        orderReference: 'DON-1',
        status: 'Declined',
        reasonCode: 1100
      })
    );
  });

  it('should return acknowledgement response', async () => {
    const req = createRequest('application/json', {
      ...validPayload,
      merchantSignature: createSignature()
    });

    const response = await POST(req);

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body).toEqual(
      expect.objectContaining({
        orderReference: 'DON-1',
        status: 'accept',
        signature: expect.any(String),
        time: expect.any(Number)
      })
    );
  });

  it('should return 400 for invalid merchant signature format', async () => {
    const req = createRequest('application/json', {
      ...validPayload,
      merchantSignature: 'wrong'
    });

    const response = await POST(req);

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body).toEqual({
      error: 'bad payload'
    });
  });

  it('should handle form-urlencoded payload', async () => {
    const formData = new FormData();

    formData.append(
      JSON.stringify({
        ...validPayload,
        merchantSignature: createSignature()
      }),
      ''
    );

    const req = {
      headers: {
        get: jest.fn(() => 'application/x-www-form-urlencoded')
      },
      formData: jest.fn().mockResolvedValue(formData)
    } as unknown as NextRequest;

    const res = await POST(req);

    expect(res.status).toBe(200);
  });

  it('should pass reason to updateDonationOrderStatus', async () => {
    const req = createRequest('application/json', {
      ...validPayload,
      transactionStatus: 'Declined',
      reason: 'Bank rejected',
      merchantSignature: createSignature({
        transactionStatus: 'Declined'
      })
    });

    await POST(req);

    expect(mockUpdateDonationOrderStatus).toHaveBeenCalledWith(
      expect.objectContaining({
        reason: 'Bank rejected'
      })
    );
  });

  it('should return 400 for unexpected form payload', async () => {
    const formData = new FormData();

    formData.append('{}', '');
    formData.append('{}', '');

    const req = {
      headers: {
        get: jest.fn(() => 'application/x-www-form-urlencoded')
      },
      formData: jest.fn().mockResolvedValue(formData)
    } as unknown as NextRequest;

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(res._testData.error).toBe('unexpected form payload');
  });

  it('should ignore duplicate callback without updating donation order', async () => {
    mockCreatePaymentEventIfNotExists.mockResolvedValue(false);

    const req = createRequest('application/json', {
      ...validPayload,
      merchantSignature: createSignature()
    });

    const res = await POST(req);

    expect(res.status).toBe(200);

    expect(res._testData).toEqual(
      expect.objectContaining({
        orderReference: 'DON-1',
        status: 'accept',
        signature: expect.any(String),
        time: expect.any(Number)
      })
    );
  });
  it('should return 400 when form contains invalid json', async () => {
    const formData = new FormData();
    formData.append('{invalid json', '');
    const req = {
      headers: { get: jest.fn(() => 'application/x-www-form-urlencoded') },
      formData: jest.fn().mockResolvedValue(formData)
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
  it('should return 400 when form payload is invalid', async () => {
    const formData = new FormData();
    formData.append(JSON.stringify({ foo: 'bar' }), '');
    const req = {
      headers: { get: jest.fn(() => 'application/x-www-form-urlencoded') },
      formData: jest.fn().mockResolvedValue(formData)
    } as unknown as NextRequest;
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
  it('should rethrow unexpected errors', async () => {
    const req = {
      headers: { get: jest.fn(() => 'application/json') },
      json: jest.fn().mockRejectedValue(new Error('boom'))
    } as unknown as NextRequest;
    await expect(POST(req)).rejects.toThrow('boom');
  });
  it('should return 500 when merchant secret key is missing', async () => {
    jest.resetModules();
    jest.doMock('~/config', () => ({ WayForPay: { MERCHANT_SECRET_KEY: '' } }));
    const nextServerLocal = await import('next/server');
    Object.defineProperty(nextServerLocal.NextResponse, 'json', {
      writable: true,
      value: jest.fn((data: unknown, init?: { status?: number }) => ({
        json: async () => data,
        status: init?.status ?? 200
      }))
    });
    const routeModule = await import('./route');
    const localPOST = routeModule.POST as unknown as MockRouteHandler;
    const req = createRequest('application/json', { ...validPayload, merchantSignature: createSignature() });
    const res = await localPOST(req);
    expect(res.status).toBe(500);
  });
  it('should save null providerTxnId when authCode is missing', async () => {
    const req = createRequest('application/json', {
      ...validPayload,
      authCode: undefined,
      merchantSignature: createSignature({ authCode: '' })
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockUpdateDonationOrderStatus).toHaveBeenCalledWith(expect.objectContaining({ providerTxnId: null }));
  });
  it('should accept callback without cardPan', async () => {
    const req = createRequest('application/json', {
      ...validPayload,
      cardPan: undefined,
      merchantSignature: createSignature({ cardPan: '' })
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
