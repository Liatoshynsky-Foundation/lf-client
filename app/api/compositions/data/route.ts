'use server';
import { NextRequest, NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const params = url.searchParams;
    const locale = params.get('locale') || 'uk';
    const search = params.get('search') || '';

    const genres = params.getAll('genre');
    const categories = params.getAll('category');
    const yearFrom = params.get('yearFrom');
    const yearTo = params.get('yearTo');
<<<<<<< HEAD

    const filters: any = { genres: null, years: { min: 1900, max: 1998 } };
=======
    const filters: any = {};
>>>>>>> bfc2ba6 (fix: fixed filtering and removed bugs)
    if (genres.length) filters.genres = genres;
    if (categories.length) filters.categories = categories;

    if (yearFrom || yearTo) {
      const min = yearFrom ? Number(yearFrom) : 1900;
      const max = yearTo ? Number(yearTo) : new Date().getFullYear();
      filters.years = { min, max };
    }

    const artistryService = createRequestContainer().resolve('artistryService');
    const data = await artistryService.getAllCompositions(
      locale,
      search,
      Object.keys(filters).length ? filters : undefined
    );
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unexpected error' }, { status: 500 });
  }
}
