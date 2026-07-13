import newPaymentEventRepository from './paymentEvent.repository';

import { WayForPayTransactionStatus } from '~/domain/dto/wayForPayCallback.dto';
import PaymentEventModel from '~/infrastructure/models/way-for-pay/paymentEvent.model';

jest.mock('~/infrastructure/db/connect', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('~/infrastructure/models/way-for-pay/paymentEvent.model', () => ({
  __esModule: true,
  default: {
    create: jest.fn()
  }
}));

const paymentEventRepository = newPaymentEventRepository();

describe('paymentEventRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('newPaymentEventRepository', () => {
    it('should return repository instance', () => {
      const repo = newPaymentEventRepository();

      expect(repo).toBeDefined();
      expect(typeof repo.createIfNotExists).toBe('function');
    });
  });

  describe('createIfNotExists', () => {
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

    it('should create payment event', async () => {
      (PaymentEventModel.create as jest.Mock).mockResolvedValue({});

      const result = await paymentEventRepository.createIfNotExists(input);

      expect(PaymentEventModel.create).toHaveBeenCalledWith(input);
      expect(result).toBe(true);
    });

    it('should return false when duplicate key error occurs', async () => {
      (PaymentEventModel.create as jest.Mock).mockRejectedValue({
        code: 11000
      });

      const result = await paymentEventRepository.createIfNotExists(input);

      expect(result).toBe(false);
    });

    it('should rethrow unknown errors', async () => {
      const error = new Error('Database error');

      (PaymentEventModel.create as jest.Mock).mockRejectedValue(error);

      await expect(paymentEventRepository.createIfNotExists(input)).rejects.toThrow(error);
    });
  });
});
