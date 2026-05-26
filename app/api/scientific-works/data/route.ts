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
      yearFrom: rawFilters.years?.min ?? null,
      yearTo: rawFilters.years?.max ?? null
    };

    const scientificWorksService = createRequestContainer().resolve('scientificService');
    const data = await scientificWorksService.getAllScientificWorks(locale, filters);

    return NextResponse.json(data);
  } catch (error) {
    logger.error('[API:GET:scientific-works] Failed to fetch scientific works', error);

    return NextResponse.json({ message: errors.SERVER_ERROR.message }, { status: 500 });
  }
}
