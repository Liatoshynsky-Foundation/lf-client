'use server';

import { NextRequest, NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const locale = params.get('locale') || 'uk';

    const container = createRequestContainer();
    const artistryService = container.resolve('artistryService');

    const [titles, yearRange, genres] = await Promise.all([
      artistryService.getAllCompositionTitles(locale),
      artistryService.getCompositionsYearRange(),
      artistryService.getAllGenres(locale)
    ]);

    return NextResponse.json({ titles, yearRange, genres });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unexpected error' }, { status: 500 });
  }
}
