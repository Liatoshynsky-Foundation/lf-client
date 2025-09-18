import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

import { WayforPayInvoice } from '~/types/types/wayForPay';

const MERCHANT_ACCOUNT = process.env.MERCHANT_ACCOUNT || 'test_merch_n1';
const MERCHANT_SECRET = process.env.MERCHANT_SECRET_KEY || 'filk3409refn54t54t*FNJRET';
const DOMAIN_NAME = process.env.DOMAIN_NAME!;

// Rate limiter: max 5 requests per IP per minute
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '';
  try {
    await rateLimiter.consume(ip as string);
  } catch {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await request.json();
  const { amount, lang, currency } = body;

  if (typeof amount !== 'number' || amount < 1 || amount > 1000) {
    return NextResponse.json({ error: 'Invalid donation amount' }, { status: 400 });
  }

  const orderReference = `DON-${Date.now()}`;
  const orderDate = Math.floor(Date.now() / 1000);

  const data: WayforPayInvoice = {
    merchantAccount: MERCHANT_ACCOUNT,
    merchantDomainName: DOMAIN_NAME,
    orderReference,
    orderDate,
    amount,
    currency: currency ?? 'UAH',
    productName: ['Donation'],
    productCount: [1],
    productPrice: [amount],
    language: lang === 'en' ? 'EN' : 'UA'
  };

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

  const merchantSignature = crypto.createHmac('md5', MERCHANT_SECRET).update(signatureBase).digest('hex');

  return NextResponse.json({ ...data, merchantSignature });
}
