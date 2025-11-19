import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET() {
  try {
    const fundsService = createRequestContainer().resolve('fundsService');
    const funds = await fundsService.getFunds();

    return NextResponse.json({ success: true, data: funds });
  } catch (error) {
    console.error('Error fetching funds:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
