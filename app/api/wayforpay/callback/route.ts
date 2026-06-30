import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

import { WayForPay } from '~/config';
import { DonationOrderStatus, PaymentProvider } from '~/domain/dto/donationOrder.dto';
import { WayForPayCallbackDTO } from '~/domain/dto/wayForPayCallback.dto';
import type { UpdateDonationOrderStatusInput } from '~/infrastructure/repositories/way-for-pay/donationOrder.repo';
import newDonationOrderRepository from '~/infrastructure/repositories/way-for-pay/donationOrder.repository';
import logger from '~/middleware/logger/logger';
import { createWayForPayService } from '~/services/way-for-pay/wayForPayService';

function generateSignature(signatureBase: string, secretKey: string) {
  return crypto.createHmac('md5', secretKey).update(signatureBase, 'utf8').digest('hex');
}

const statusMap = {
  Approved: DonationOrderStatus.Paid,
  Declined: DonationOrderStatus.Declined,
  Expired: DonationOrderStatus.Expired,
  InProcessing: DonationOrderStatus.InProcessing
};

export async function POST(request: NextRequest) {
  const donationOrderRepository = newDonationOrderRepository();

  const wayForPayService = createWayForPayService({
    donationOrderRepository
  });

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'unsupported media type' }, { status: 415 });
  }
  const body: WayForPayCallbackDTO = await request.json();

  const {
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode,
    cardPan,
    transactionStatus,
    reasonCode,
    reason,
    merchantSignature
  } = body;

  if (
    !merchantAccount ||
    !orderReference ||
    amount === undefined ||
    !currency ||
    !transactionStatus ||
    reasonCode === undefined ||
    !merchantSignature
  ) {
    return NextResponse.json({ error: 'bad payload' }, { status: 400 });
  }

  logger.info('[API:POST:wayforpay/callback] WayForPay callback received', {
    orderReference,
    transactionStatus
  });

  const signatureBase = [
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode ?? '',
    cardPan ?? '',
    transactionStatus,
    reasonCode
  ].join(';');

  if (!WayForPay.MERCHANT_SECRET_KEY) {
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 });
  }

  const localSignature = generateSignature(signatureBase, WayForPay.MERCHANT_SECRET_KEY);

  if (localSignature !== merchantSignature) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 403 });
  }

  const donationOrder = await wayForPayService.findDonationOrder(orderReference);

  if (!donationOrder) {
    return NextResponse.json({ error: 'order not found' }, { status: 404 });
  }

  if (donationOrder.amount !== amount || donationOrder.currency !== currency) {
    return NextResponse.json({ error: 'amount/currency mismatch' }, { status: 422 });
  }

  const nextStatus = statusMap[transactionStatus] ?? DonationOrderStatus.Pending;

  const updateData: UpdateDonationOrderStatusInput = {
    orderReference,
    status: nextStatus,
    reasonCode,
    reason
  };

  if (nextStatus === DonationOrderStatus.Paid) {
    updateData.paidAt = new Date();
    updateData.paymentProvider = PaymentProvider.WayForPay;
    updateData.providerTxnId = authCode ?? null;
  }

  await wayForPayService.updateDonationOrderStatus(updateData);

  logger.info('[API:POST:wayforpay/callback] Donation order updated', {
    orderReference,
    status: nextStatus
  });

  const time = Math.floor(Date.now() / 1000);
  const status = 'accept';

  const ackBase = [orderReference, status, String(time)].join(';');

  const signature = generateSignature(ackBase, WayForPay.MERCHANT_SECRET_KEY);

  return NextResponse.json(
    {
      orderReference,
      status,
      time,
      signature
    },
    { status: 200 }
  );
}
