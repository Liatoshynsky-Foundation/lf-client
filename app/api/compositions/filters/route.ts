'use server';

import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseLocale } from '~/lib/utils/translation/parseLocale';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const locale = parseLocale(params);

    const container = createRequestContainer();
    const artistryService = container.resolve('artistryService');

    const [titles, yearRange, categories, genres] = await Promise.all([
      artistryService.getAllCompositionTitles(locale),
      artistryService.getCompositionsYearRange(),
      artistryService.getAllCategories(locale),
      artistryService.getAllGenres(locale)
    ]);

    return NextResponse.json({ titles, yearRange, genres, categories });
  } catch {
    return NextResponse.json(errors.FILTERS_FETCH_FAILED, { status: 500 });
  }
}
