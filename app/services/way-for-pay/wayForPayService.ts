import type {
  CreateDonationOrderInput,
  DonationOrderRepository,
  UpdateDonationOrderStatusInput
} from '~/infrastructure/repositories/way-for-pay/donationOrder.repo';
import type {
  CreatePaymentEventInput,
  PaymentEventRepository
} from '~/infrastructure/repositories/way-for-pay/paymentEvent.repo';

interface WayForPayServiceDeps {
  donationOrderRepository: DonationOrderRepository;
  paymentEventRepository: PaymentEventRepository;
}

export const createWayForPayService = ({ donationOrderRepository, paymentEventRepository }: WayForPayServiceDeps) => ({
  createDonationOrder: (input: CreateDonationOrderInput) => donationOrderRepository.create(input),

  findDonationOrder: (orderReference: string) => donationOrderRepository.findByOrderReference(orderReference),

  updateDonationOrderStatus: (input: UpdateDonationOrderStatusInput) => donationOrderRepository.updateStatus(input),

  createPaymentEventIfNotExists: (input: CreatePaymentEventInput) => paymentEventRepository.createIfNotExists(input)
});

export type WayForPayService = ReturnType<typeof createWayForPayService>;
