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
        data.authCode,
        data.cardPan,
        data.transactionStatus,
        data.reasonCode
      ].join(';'),
      'utf8'
    )
    .digest('hex');
}

const mockFindDonationOrder = jest.fn();
const mockUpdateDonationOrderStatus = jest.fn();

jest.mock('~/config', () => ({
  WayForPay: {
    MERCHANT_SECRET_KEY: 'secret'
  }
}));

jest.mock('~/services/way-for-pay/wayForPayService', () => ({
  createWayForPayService: jest.fn(() => ({
    findDonationOrder: mockFindDonationOrder,
    updateDonationOrderStatus: mockUpdateDonationOrderStatus
  }))
}));

jest.mock('~/infrastructure/repositories/way-for-pay/donationOrder.repository', () => ({
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

describe('WayForPay Callback API Route (POST)', () => {
  let POST: (typeof import('./route'))['POST'];
  let nextServer: typeof import('next/server');

  beforeAll(async () => {
    if (typeof global.Request === 'undefined') {
      (global as any).Request = class {
        constructor() {}
      } as any;

      (global as any).Response = class {} as any;

      (global as any).TextEncoder = TextEncoder;
      (global as any).TextDecoder = TextDecoder;
    }

    nextServer = await import('next/server');

    nextServer.NextResponse.json = jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status ?? 200,
      _testData: data
    })) as never;

    POST = (await import('./route')).POST;
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockFindDonationOrder.mockResolvedValue({
      orderReference: 'DON-1',
      amount: 100,
      currency: 'UAH'
    });

    mockUpdateDonationOrderStatus.mockResolvedValue(undefined);
  });

  it('should return 415 for unsupported media type', async () => {
    const req = createRequest('text/plain', {});

    const res = await POST(req);

    expect(res.status).toBe(415);
    expect((res as any)._testData.error).toBe('unsupported media type');
  });

  it('should return 400 for invalid payload', async () => {
    const req = createRequest('application/json', {});

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect((res as any)._testData.error).toBe('bad payload');
  });

  it('should return 403 for invalid signature', async () => {
    const req = createRequest('application/json', {
      merchantAccount: 'test_merch_n1',
      orderReference: 'DON-1',
      amount: 100,
      currency: 'UAH',
      transactionStatus: 'Approved',
      reasonCode: 1100,
      merchantSignature: 'wrong'
    });

    const res = await POST(req);

    expect(res.status).toBe(403);
    expect((res as any)._testData.error).toBe('invalid signature');
  });

  it('should return 404 when donation order is not found', async () => {
    mockFindDonationOrder.mockResolvedValue(null);

    const req = createRequest('application/json', {
      merchantAccount: 'test_merch_n1',
      orderReference: 'DON-1',
      amount: 100,
      currency: 'UAH',
      authCode: 'AUTH123',
      cardPan: '444455******1111',
      transactionStatus: 'Approved',
      reasonCode: 1100,
      merchantSignature: createSignature()
    });

    const res = await POST(req);

    expect(res.status).toBe(404);
    expect((res as any)._testData.error).toBe('order not found');
  });

  it('should return 422 when amount does not match', async () => {
    mockFindDonationOrder.mockResolvedValue({
      orderReference: 'DON-1',
      amount: 500,
      currency: 'UAH'
    });

    const req = createRequest('application/json', {
      merchantAccount: 'test_merch_n1',
      orderReference: 'DON-1',
      amount: 100,
      currency: 'UAH',
      authCode: 'AUTH123',
      cardPan: '444455******1111',
      transactionStatus: 'Approved',
      reasonCode: 1100,
      merchantSignature: createSignature()
    });

    const res = await POST(req);

    expect(res.status).toBe(422);
    expect((res as any)._testData.error).toBe('amount/currency mismatch');
  });

  it('should update donation order when payment is approved', async () => {
    const req = createRequest('application/json', {
      merchantAccount: 'test_merch_n1',
      orderReference: 'DON-1',
      amount: 100,
      currency: 'UAH',
      authCode: 'AUTH123',
      cardPan: '444455******1111',
      transactionStatus: 'Approved',
      reasonCode: 1100,
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
      merchantAccount: 'test_merch_n1',
      orderReference: 'DON-1',
      amount: 100,
      currency: 'UAH',
      authCode: 'AUTH123',
      cardPan: '444455******1111',
      transactionStatus: 'Declined',
      reasonCode: 1100,
      merchantSignature: createSignature({
        transactionStatus: 'Declined'
      })
    });

    const res = await POST(req);

    expect(res.status).toBe(200);

    expect(mockUpdateDonationOrderStatus).toHaveBeenCalledWith({
      orderReference: 'DON-1',
      status: 'Declined',
      reasonCode: 1100,
      reason: undefined
    });
  });

  it('should return acknowledgement response', async () => {
    const req = createRequest('application/json', {
      merchantAccount: 'test_merch_n1',
      orderReference: 'DON-1',
      amount: 100,
      currency: 'UAH',
      authCode: 'AUTH123',
      cardPan: '444455******1111',
      transactionStatus: 'Approved',
      reasonCode: 1100,
      merchantSignature: createSignature()
    });

    const res = await POST(req);

    expect(res.status).toBe(200);

    expect((res as any)._testData).toEqual(
      expect.objectContaining({
        orderReference: 'DON-1',
        status: 'accept',
        signature: expect.any(String),
        time: expect.any(Number)
      })
    );
  });
});
