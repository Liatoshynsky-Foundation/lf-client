import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseLocale } from '~/lib/utils/translation/parseLocale';

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
  } catch {
    return NextResponse.json(errors.FILTERS_FETCH_FAILED, { status: 500 });
  }
}
