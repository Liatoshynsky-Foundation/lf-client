import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseFilters } from '~/lib/utils/filters/parseFilters';
import { parseLocale } from '~/lib/utils/translation/parseLocale';
export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const locale = parseLocale(params);
    const rawFilters = parseFilters(params);

    const filters = {
      search: rawFilters.search,
      author: rawFilters.author,
      yearFrom: rawFilters.years.min,
      yearTo: rawFilters.years.max
    };

    const container = createRequestContainer();
    const service = container.resolve('scientificService');

    const titles = await service.getAllScientificTitles(locale, filters);

    return NextResponse.json({ titles });
  } catch {
    return NextResponse.json(errors.FILTERS_FETCH_FAILED, { status: 500 });
  }
}
