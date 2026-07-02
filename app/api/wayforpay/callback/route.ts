import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

import { WayForPay } from '~/config';
import { DonationOrderStatus, PaymentProvider } from '~/domain/dto/donationOrder.dto';
import type { UpdateDonationOrderStatusInput } from '~/infrastructure/repositories/way-for-pay/donationOrder.repo';
import newDonationOrderRepository from '~/infrastructure/repositories/way-for-pay/donationOrder.repository';
import { validateWithZod } from '~/lib/utils/validateRequestData';
import logger from '~/middleware/logger/logger';
import { createWayForPayService } from '~/services/way-for-pay/wayForPayService';
import { wayForPayCallbackSchema } from '~/validators/wayForPayCallback.schema';

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

  const contentType = request.headers.get('content-type');

  let body;

  if (contentType?.includes('application/json')) {
    const validation = validateWithZod(await request.json(), wayForPayCallbackSchema);

    if (!validation.valid) {
      return NextResponse.json({ error: 'bad payload' }, { status: 400 });
    }

    body = validation.value;
  } else if (contentType?.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData();

    const entries = [...formData.entries()];

    if (entries.length !== 1) {
      return NextResponse.json({ error: 'unexpected form payload' }, { status: 400 });
    }

    const [jsonString, _] = entries[0];

    try {
      body = JSON.parse(jsonString);
    } catch {
      return NextResponse.json({ error: 'bad payload' }, { status: 400 });
    }

    const validation = validateWithZod(body, wayForPayCallbackSchema);

    if (!validation.valid) {
      return NextResponse.json({ error: 'bad payload' }, { status: 400 });
    }

    body = validation.value;
  } else {
    return NextResponse.json({ error: 'unsupported media type' }, { status: 415 });
  }

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
