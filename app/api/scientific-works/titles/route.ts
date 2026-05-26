import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseFilters } from '~/lib/utils/filters/parseFilters';
import { parseLocale } from '~/lib/utils/translation/parseLocale';
import logger from '~/middleware/logger/logger';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const locale = parseLocale(params);
    const rawFilters = parseFilters(params);

    const filters = {
      search: rawFilters.search,
      author: rawFilters.author,
      yearFrom: rawFilters.years?.min,
      yearTo: rawFilters.years?.max
    };

    const container = createRequestContainer();
    const service = container.resolve('scientificService');

    const titles = await service.getAllScientificTitles(locale, filters);

    return NextResponse.json({ titles });
  } catch (error) {
    logger.error('[API:GET:scientific-works:titles] Failed to fetch scientific works titles', error);

    return NextResponse.json({ message: errors.FILTERS_FETCH_FAILED.message }, { status: 500 });
  }
}
