import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseFilters } from '~/lib/utils/filters/parseFilters';
import { parseLocale } from '~/lib/utils/translation/parseLocale';
import logger from '~/middleware/logger/logger';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const search = params.get('search') || '';
    const locale = parseLocale(params);
    const filters = parseFilters(params);

    const artistryService = createRequestContainer().resolve('artistryService');
    const data = await artistryService.getAllCompositions(locale, search, filters);
    return NextResponse.json(data);
  } catch (error) {
    logger.error(`[API:GET:compositions] Failed to fetch compositions. URL: ${req.nextUrl.pathname}`, error);

    return NextResponse.json({ message: errors.COMPOSITION_FETCH_FAILED }, { status: 500 });
  }
}
