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
    const scientificWorksService = container.resolve('scientificService');

    const [yearRange, authors] = await Promise.all([
      scientificWorksService.getScientificWorksYearRange(),
      scientificWorksService.getAllAuthors(locale)
    ]);

    return NextResponse.json({
      yearRange,
      authors
    });
  } catch (error) {
    logger.error('[API:GET:scientific-works:filters] Failed to fetch scientific works filters', error);

    return NextResponse.json(
      {
        code: errors.FILTERS_FETCH_FAILED.code,
        message: errors.FILTERS_FETCH_FAILED.message
      },
      { status: 500 }
    );
  }
}
