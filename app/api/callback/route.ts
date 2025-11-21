import { startSession } from 'mongoose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

import { WayForPay } from '~/config';
import dbConnect from '~/infrastructure/db/connect';
import type { IDonationOrder, TDonationOrderStatus } from '~/infrastructure/models/way-for-pay/DonationOrder';
import { DonationOrder } from '~/infrastructure/models/way-for-pay/DonationOrder';
import type { IWayforPayCallbackPayload } from '~/infrastructure/models/way-for-pay/PaymentEvent';
import { PaymentEvent } from '~/infrastructure/models/way-for-pay/PaymentEvent';

export const runtime = 'nodejs';

function hmacMd5(base: string, key: string) {
  return crypto.createHmac('md5', key).update(base, 'utf8').digest('hex');
}

type MongoErrorWithCode = { code: number };

function isDuplicateKeyError(error: unknown): error is MongoErrorWithCode {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'number' &&
    (error as { code: number }).code === 11000
  );
}

export async function POST(req: NextRequest) {
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'unsupported media type' }, { status: 415 });
  }

  if (!WayForPay.MERCHANT_SECRET_KEY) {
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 });
  }

  const body = (await req.json()) as IWayforPayCallbackPayload;

  const {
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode,
    cardPan,
    transactionStatus,
    reasonCode,
    merchantSignature,
    reason
  } = body ?? {};

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

  const baseIncoming = [
    merchantAccount,
    String(orderReference),
    String(amount),
    String(currency),
    authCode ?? '',
    cardPan ?? '',
    String(transactionStatus),
    String(reasonCode)
  ].join(';');

  const localSig = hmacMd5(baseIncoming, WayForPay.MERCHANT_SECRET_KEY);
  if (localSig !== merchantSignature) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 403 });
  }

  await dbConnect();

  const order = await DonationOrder.findOne({ orderReference }).lean<IDonationOrder>();

  if (!order) {
    return NextResponse.json({ error: 'order not found' }, { status: 500 });
  }

  if (Number(order.amount) !== Number(amount) || order.currency !== String(currency)) {
    return NextResponse.json({ error: 'amount/currency mismatch' }, { status: 422 });
  }

  const session = await startSession();

  try {
    await session.withTransaction(async () => {
      let isNewEvent = true;

      try {
        await PaymentEvent.create(
          [
            {
              orderReference,
              transactionStatus: String(transactionStatus),
              authCode: authCode ?? '',
              reasonCode: reasonCode ?? null,
              payload: body
            }
          ],
          { session }
        );
      } catch (error: unknown) {
        if (isDuplicateKeyError(error)) {
          isNewEvent = false;
        } else {
          throw error;
        }
      }

      if (isNewEvent) {
        const map: Record<string, TDonationOrderStatus> = {
          Approved: 'Paid',
          Declined: 'Declined',
          Expired: 'Expired',
          InProcessing: 'InProcessing'
        };

        const nextStatus: TDonationOrderStatus = map[String(transactionStatus)] ?? 'Pending';

        const update: Partial<IDonationOrder> & { status: TDonationOrderStatus } = {
          status: nextStatus,
          reasonCode: reasonCode ?? null,
          reason: reason ?? null
        };

        if (nextStatus === 'Paid') {
          update.paidAt = new Date();
          update.paymentProvider = 'WayForPay';
          update.providerTxnId = authCode ?? null;
        }

        await DonationOrder.updateOne({ orderReference }, { $set: update }, { session });
      }
    });
  } finally {
    await session.endSession();
  }

  const time = Math.floor(Date.now() / 1000);
  const status = 'accept' as const;
  const ackBase = [String(orderReference), status, String(time)].join(';');
  const signature = hmacMd5(ackBase, WayForPay.MERCHANT_SECRET_KEY);

  return NextResponse.json({ orderReference, status, time, signature }, { status: 200 });
}
