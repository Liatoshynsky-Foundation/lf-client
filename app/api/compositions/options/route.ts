'use server';

import { NextRequest, NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const locale = params.get('locale') || 'uk';

    const container = createRequestContainer();
    const artistryService = container.resolve('artistryService');

    const [opuses, titles, yearRange, genres] = await Promise.all([
      artistryService.getAllOpuses(locale),
      artistryService.getAllCompositionTitles(locale),
      artistryService.getCompositionsYearRange(),
      artistryService.getAllGenres(locale)
    ]);

    return NextResponse.json({ opuses, titles, yearRange, genres });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unexpected error' }, { status: 500 });
  }
}
