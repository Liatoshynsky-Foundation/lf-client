import { createWayForPayService } from './wayForPayService';

import { DonationOrderStatus, PaymentProvider } from '~/domain/dto/donationOrder.dto';
import { WayForPayTransactionStatus } from '~/domain/dto/wayForPayCallback.dto';

describe('WayForPayService', () => {
  const mockDonationOrderRepository = {
    create: jest.fn(),
    findByOrderReference: jest.fn(),
    updateStatus: jest.fn()
  };

  const mockPaymentEventRepository = {
    createIfNotExists: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create donation order', async () => {
    mockDonationOrderRepository.create.mockResolvedValue({});

    const service = createWayForPayService({
      donationOrderRepository: mockDonationOrderRepository,
      paymentEventRepository: mockPaymentEventRepository
    });

    const input = {
      orderReference: 'DON-1',
      amount: 100,
      currency: 'UAH' as const,
      language: 'UA' as const,
      productName: ['Donation'],
      productCount: [1],
      productPrice: [100]
    };

    await service.createDonationOrder(input);

    expect(mockDonationOrderRepository.create).toHaveBeenCalledWith(input);
  });

  it('should find donation order', async () => {
    mockDonationOrderRepository.findByOrderReference.mockResolvedValue({});

    const service = createWayForPayService({
      donationOrderRepository: mockDonationOrderRepository,
      paymentEventRepository: mockPaymentEventRepository
    });

    await service.findDonationOrder('DON-1');

    expect(mockDonationOrderRepository.findByOrderReference).toHaveBeenCalledWith('DON-1');
  });

  it('should update donation order status', async () => {
    mockDonationOrderRepository.updateStatus.mockResolvedValue(undefined);

    const service = createWayForPayService({
      donationOrderRepository: mockDonationOrderRepository,
      paymentEventRepository: mockPaymentEventRepository
    });

    const paidAt = new Date();

    const input = {
      orderReference: 'DON-1',
      status: DonationOrderStatus.Paid,
      paymentProvider: PaymentProvider.WayForPay,
      providerTxnId: 'AUTH123',
      paidAt,
      reasonCode: null,
      reason: null
    };

    await service.updateDonationOrderStatus(input);

    expect(mockDonationOrderRepository.updateStatus).toHaveBeenCalledWith(input);
  });

  it('should create payment event if repository exists', async () => {
    mockPaymentEventRepository.createIfNotExists.mockResolvedValue(true);

    const service = createWayForPayService({
      donationOrderRepository: mockDonationOrderRepository,
      paymentEventRepository: mockPaymentEventRepository
    });

    const input = {
      orderReference: 'DON-1',
      transactionStatus: WayForPayTransactionStatus.Approved,
      authCode: 'AUTH123',
      reasonCode: 1100,
      payload: {
        merchantAccount: 'merchant',
        orderReference: 'DON-1',
        merchantSignature: 'signature',
        amount: 100,
        currency: 'UAH',
        transactionStatus: WayForPayTransactionStatus.Approved,
        reasonCode: 1100,
        authCode: 'AUTH123'
      }
    };

    await service.createPaymentEventIfNotExists(input);

    expect(mockPaymentEventRepository.createIfNotExists).toHaveBeenCalledWith(input);
  });

  it('should throw error if payment event repository is not configured', async () => {
    const service = createWayForPayService({
      donationOrderRepository: mockDonationOrderRepository
    });

    expect(() =>
      service.createPaymentEventIfNotExists({
        orderReference: 'DON-1',
        transactionStatus: WayForPayTransactionStatus.Approved,
        authCode: 'AUTH123',
        reasonCode: 1100,
        payload: {
          merchantAccount: 'merchant',
          orderReference: 'DON-1',
          merchantSignature: 'signature',
          amount: 100,
          currency: 'UAH',
          transactionStatus: WayForPayTransactionStatus.Approved,
          reasonCode: 1100,
          authCode: 'AUTH123'
        }
      })
    ).toThrow('PaymentEventRepository is not configured');
  });
});
