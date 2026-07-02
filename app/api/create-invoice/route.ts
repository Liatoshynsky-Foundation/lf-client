import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { v4 as uuidv4 } from 'uuid';

import { errors } from '~/constants/errors';
import { WayforPayInvoice } from '~/types/types/wayForPay';
import { errorResponse } from '~/utils/apiResponse';

import { WayForPay } from '~/config';
import newDonationOrderRepository from '~/infrastructure/repositories/way-for-pay/donationOrder.repository';
import logger from '~/middleware/logger/logger';
import { createWayForPayService } from '~/services/way-for-pay/wayForPayService';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  try {
    await rateLimiter.consume(ip as string);
  } catch (error_) {
    logger.warn(`[API:POST:wayforpay] Rate limit exceeded for IP: ${ip}`, { rateLimiter: error_ });
    return errorResponse(['Too many requests'], 429);
  }

  try {
    const body = await request.json();
    const { amount, lang, currency } = body;

    if (typeof amount !== 'number' || amount < 1 || amount > 1000) {
      return errorResponse(['Invalid donation amount. Must be between 1 and 1000.'], 400);
    }

    const allowedCurrencies = ['UAH', 'USD', 'EUR'];
    const finalCurrency = currency ?? 'UAH';
    if (!allowedCurrencies.includes(finalCurrency)) {
      return errorResponse(['Unsupported currency'], 400);
    }

    const callbackUrl = `${WayForPay.DOMAIN_NAME}/api/wayforpay/callback`;

    const data: WayforPayInvoice = {
      merchantAccount: WayForPay.MERCHANT_ACCOUNT,
      merchantDomainName: WayForPay.DOMAIN_NAME,
      orderReference: `DON-${uuidv4()}`,
      orderDate: Math.floor(Date.now() / 1000),
      amount,
      currency: finalCurrency,
      productName: ['Donation'],
      productCount: [1],
      productPrice: [amount],
      language: lang === 'en' ? 'EN' : 'UA',

      serviceUrl: callbackUrl
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

    const merchantSignature = crypto
      .createHmac('md5', WayForPay.MERCHANT_SECRET_KEY)
      .update(signatureBase)
      .digest('hex');

    const donationOrderRepository = newDonationOrderRepository();

    const wayForPayService = createWayForPayService({
      donationOrderRepository
    });

    await wayForPayService.createDonationOrder({
      orderReference: data.orderReference,
      amount: data.amount,
      currency: data.currency,
      language: data.language,
      productName: data.productName,
      productCount: data.productCount,
      productPrice: data.productPrice
    });

    return NextResponse.json({ ...data, merchantSignature });
  } catch (error) {
    logger.error('[API:POST:wayforpay] Failed to generate WayForPay invoice', error);

    return NextResponse.json({ message: errors.SERVER_ERROR.message }, { status: 500 });
  }
}
