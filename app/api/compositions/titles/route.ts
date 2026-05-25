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
      category: rawFilters.categories,
      genre: rawFilters.genres,
      yearFrom: rawFilters.years?.min,
      yearTo: rawFilters.years?.max
    };

    const container = createRequestContainer();
    const artistryService = container.resolve('artistryService');

    const titles = await artistryService.getAllCompositionTitles(locale, filters);

    return NextResponse.json({ titles });
  } catch (error) {
    logger.error('[API:GET:compositions:titles] Failed to fetch composition titles', error);

    return NextResponse.json({ message: errors.COMPOSITION_FETCH_FAILED }, { status: 500 });
  }
}
