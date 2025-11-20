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

    const [titles, yearRange, authors] = await Promise.all([
      scientificWorksService.getAllScientificTitles(locale),
      scientificWorksService.getScientificWorksYearRange(),
      scientificWorksService.getAllAuthors(locale)
    ]);

    return NextResponse.json({
      titles,
      yearRange,
      authors
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(errors.FILTERS_FETCH_FAILED, { status: 500 });
  }
}
