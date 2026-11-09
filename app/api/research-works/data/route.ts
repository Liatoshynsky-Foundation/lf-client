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

    const researchWorksService = createRequestContainer().resolve('researchService');
    const data = await researchWorksService.getAllResearchWorks(filters);

    return NextResponse.json(data);
  } catch (error) {
    logger.error('[API:GET:research-works] Failed to fetch research works', error);

    return NextResponse.json({ message: errors.SERVER_ERROR.message }, { status: 500 });
  }
}
