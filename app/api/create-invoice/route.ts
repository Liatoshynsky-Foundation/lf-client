import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { v4 as uuidv4 } from 'uuid';

import { WayforPayInvoice } from '~/types/types/wayForPay';
import { errorResponse } from '~/utils/apiResponse';

import { WayForPay } from '~/config';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '';
  try {
    await rateLimiter.consume(ip as string);
  } catch {
    return errorResponse(['Too many requests'], 429);
  }

  const body = await request.json();
  const { amount, lang, currency } = body;

  if (typeof amount !== 'number' || amount < 1 || amount > 1000) {
    return errorResponse(['Invalid donation amount'], 400);
  }

  const data: WayforPayInvoice = {
    merchantAccount: WayForPay.MERCHANT_ACCOUNT,
    merchantDomainName: WayForPay.DOMAIN_NAME,
    orderReference: `DON-${uuidv4()}`,
    orderDate: Math.floor(Date.now() / 1000),
    amount,
    currency: currency ?? 'UAH',
    productName: ['Donation'],
    productCount: [1],
    productPrice: [amount],
    language: lang === 'en' ? 'EN' : 'UA',
    merchantCallbackUrl: `${WayForPay.DOMAIN_NAME}/api/wayforpay/callback`
  };

  // ⚠️ IMPORTANT:
  // The order of fields below is predefined by WayforPay and MUST NOT be changed
  // Values are joined using ";" as a separator according to their API specification
  const signatureBase = [
    data.merchantAccount,
    data.merchantDomainName,
    data.orderReference,
    data.orderDate,
    data.amount,
    data.currency,
    ...data.productName,
    ...data.productCount,
    ...data.productPrice
  ].join(';');

  const merchantSignature = crypto.createHmac('md5', WayForPay.MERCHANT_SECRET_KEY).update(signatureBase).digest('hex');

  return NextResponse.json({ ...data, merchantSignature });
}
