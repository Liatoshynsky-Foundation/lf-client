'use server';
import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import { parseFilters } from '~/lib/utils/filters/parseFilters';
import { parseLocale } from '~/lib/utils/translation/parseLocale';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const search = params.get('search') || '';
    const locale = parseLocale(params);
    const filters = parseFilters(params);

    const scientificWorksService = createRequestContainer().resolve('scientificService');
    const data = await scientificWorksService.getAllScientificWorks(locale, filters, search);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: errors.COMPOSITION_FETCH_FAILED }, { status: 500 });
  }
}
