'use server';
import { NextRequest, NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get('locale') || 'uk';
  const titles = await createRequestContainer().resolve('artistryService').getAllCompositionTitles(locale);
  return NextResponse.json(titles);
}
