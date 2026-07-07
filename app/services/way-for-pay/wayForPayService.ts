import type {
  CreateDonationOrderInput,
  DonationOrderRepository,
  UpdateDonationOrderStatusInput
} from '~/infrastructure/repositories/way-for-pay/donationOrder.repo';

interface WayForPayServiceDeps {
  donationOrderRepository: DonationOrderRepository;
}

export const createWayForPayService = ({ donationOrderRepository }: WayForPayServiceDeps) => ({
  createDonationOrder: (input: CreateDonationOrderInput) => donationOrderRepository.create(input),

  findDonationOrder: (orderReference: string) => donationOrderRepository.findByOrderReference(orderReference),

  updateDonationOrderStatus: (input: UpdateDonationOrderStatusInput) => donationOrderRepository.updateStatus(input)
});

export type WayForPayService = ReturnType<typeof createWayForPayService>;
