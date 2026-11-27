import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET() {
  const paymentDetailsService = createRequestContainer().resolve('paymentDetailsService');
  const tabs = await paymentDetailsService.getPublicTabs();

  return NextResponse.json({ tabs });
}
