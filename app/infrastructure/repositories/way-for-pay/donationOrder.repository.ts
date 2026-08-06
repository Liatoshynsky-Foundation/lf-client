import { DonationOrderDTO, DonationOrderStatus, PaymentProvider } from '~/domain/dto/donationOrder.dto';
import dbConnect from '~/infrastructure/db/connect';
import DonationOrderModel from '~/infrastructure/models/way-for-pay/donationOrder.model';

type CreateDonationOrderInput = Omit<DonationOrderDTO, 'status'>;

type UpdateDonationOrderStatusInput = {
  orderReference: string;
  status: DonationOrderStatus;
  paidAt?: Date;
  paymentProvider?: PaymentProvider | null;
  providerTxnId?: string | null;
  reasonCode?: string | number | null;
  reason?: string | null;
};

const donationOrderRepository = {
  async create(input: CreateDonationOrderInput): Promise<DonationOrderDTO> {
    await dbConnect();

    const order = await new DonationOrderModel({
      ...input,
      status: DonationOrderStatus.Pending
    }).save();

    return order.toObject() as DonationOrderDTO;
  },

  async findByOrderReference(orderReference: string): Promise<DonationOrderDTO | null> {
    await dbConnect();

    return DonationOrderModel.findOne({ orderReference }).lean();
  },

  async updateStatus({ orderReference, ...update }: UpdateDonationOrderStatusInput): Promise<void> {
    await dbConnect();

    await DonationOrderModel.updateOne(
      { orderReference },
      {
        $set: update
      }
    );
  }
};

function newDonationOrderRepository(): typeof donationOrderRepository {
  return donationOrderRepository;
}

export default newDonationOrderRepository;
