import newDonationOrderRepository from './donationOrder.repository';

import { DonationOrderStatus, PaymentProvider } from '~/domain/dto/donationOrder.dto';
import DonationOrderModel from '~/infrastructure/models/way-for-pay/donationOrder.model';

jest.mock('~/infrastructure/db/connect', () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockSave = jest.fn();
const mockToObject = jest.fn();

jest.mock('~/infrastructure/models/way-for-pay/donationOrder.model', () => {
  const MockModel = jest.fn().mockImplementation(() => ({
    save: mockSave
  }));

  Object.assign(MockModel, {
    findOne: jest.fn(),
    updateOne: jest.fn()
  });

  return {
    __esModule: true,
    default: MockModel
  };
});

const donationOrderRepository = newDonationOrderRepository();

describe('donationOrderRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('newDonationOrderRepository', () => {
    it('should return repository instance', () => {
      const repo = newDonationOrderRepository();

      expect(repo).toBeDefined();
      expect(typeof repo.create).toBe('function');
      expect(typeof repo.findByOrderReference).toBe('function');
      expect(typeof repo.updateStatus).toBe('function');
    });
  });

  describe('create', () => {
    it('should create donation order with Pending status', async () => {
      mockSave.mockResolvedValue({
        toObject: mockToObject
      });

      mockToObject.mockReturnValue({
        orderReference: 'DON-1',
        status: DonationOrderStatus.Pending
      });

      const result = await donationOrderRepository.create({
        orderReference: 'DON-1',
        amount: 100,
        currency: 'UAH',
        language: 'UA',
        productName: ['Donation'],
        productCount: [1],
        productPrice: [100]
      });

      expect(DonationOrderModel).toHaveBeenCalledWith(
        expect.objectContaining({
          orderReference: 'DON-1',
          status: DonationOrderStatus.Pending
        })
      );

      expect(mockSave).toHaveBeenCalled();

      expect(result.status).toBe(DonationOrderStatus.Pending);
    });
  });

  describe('findByOrderReference', () => {
    it('should return donation order', async () => {
      const order = {
        orderReference: 'DON-1'
      };

      (DonationOrderModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(order)
      });

      const result = await donationOrderRepository.findByOrderReference('DON-1');

      expect(DonationOrderModel.findOne).toHaveBeenCalledWith({
        orderReference: 'DON-1'
      });

      expect(result).toEqual(order);
    });

    it('should return null if donation order not found', async () => {
      (DonationOrderModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null)
      });

      const result = await donationOrderRepository.findByOrderReference('DON-1');

      expect(result).toBeNull();
    });
  });

  describe('updateStatus', () => {
    it('should update donation order status', async () => {
      (DonationOrderModel.updateOne as jest.Mock).mockResolvedValue({});

      const paidAt = new Date();

      await donationOrderRepository.updateStatus({
        orderReference: 'DON-1',
        status: DonationOrderStatus.Paid,
        paymentProvider: PaymentProvider.WayForPay,
        providerTxnId: 'AUTH123',
        paidAt
      });

      expect(DonationOrderModel.updateOne).toHaveBeenCalledWith(
        {
          orderReference: 'DON-1'
        },
        {
          $set: {
            status: DonationOrderStatus.Paid,
            paymentProvider: PaymentProvider.WayForPay,
            providerTxnId: 'AUTH123',
            paidAt
          }
        }
      );
    });
  });
});
