import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseFilters } from '~/lib/utils/filters/parseFilters';
import logger from '~/middleware/logger/logger';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const rawFilters = parseFilters(params);

    const filters = {
      search: rawFilters.search,
      yearFrom: rawFilters.years?.min ?? null,
      yearTo: rawFilters.years?.max ?? null
    };

    const container = createRequestContainer();
    const service = container.resolve('researchService');

    const descriptions = await service.getAllBibliographicDescriptions(filters);

    return NextResponse.json({ descriptions });
  } catch (error) {
    logger.error('[API:GET:research-works:titles] Failed to fetch research works titles', error);

    return NextResponse.json({ message: errors.FILTERS_FETCH_FAILED.message }, { status: 500 });
  }
}
