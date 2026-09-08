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
      yearFrom: rawFilters.years?.min,
      yearTo: rawFilters.years?.max
    };

    const container = createRequestContainer();
    const artistryService = container.resolve('artistryService');

    const names = await artistryService.getSearchAutocompleteOptions(locale, filters);
    return NextResponse.json({ names });
  } catch (error) {
    logger.error('[API:GET:compositions:titles] Failed to fetch composition titles', error);

    return NextResponse.json({ message: errors.COMPOSITION_FETCH_FAILED }, { status: 500 });
  }
}
