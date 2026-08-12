import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseLocale } from '~/lib/utils/translation/parseLocale';
import logger from '~/middleware/logger/logger';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const locale = parseLocale(params);

    const container = createRequestContainer();
    const artistryService = container.resolve('artistryService');

    const [yearRange, categories] = await Promise.all([
      artistryService.getCompositionsYearRange(),
      artistryService.getAllCategories(locale)
    ]);

    return NextResponse.json({ yearRange, categories });
  } catch (error) {
    logger.error('[API:GET:filters] Failed to fetch filters data (years or categories)', error);

    return NextResponse.json({ message: errors.FILTERS_FETCH_FAILED }, { status: 500 });
  }
}
