import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

import { WayForPay } from '~/config';
import { WayForPayCallbackDTO } from '~/domain/dto/wayForPayCallback.dto';
import logger from '~/middleware/logger/logger';

function generateSignature(signatureBase: string, secretKey: string) {
  return crypto.createHmac('md5', secretKey).update(signatureBase, 'utf8').digest('hex');
}

export async function POST(request: NextRequest) {
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

  return NextResponse.json({ ok: true });
}
