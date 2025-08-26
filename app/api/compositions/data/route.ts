'use server';
import { NextRequest, NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const params = url.searchParams;

    const locale = params.get('locale') || 'uk';
    const search = params.get('search') || '';

    const opuses = params.getAll('opus');
    const genres = params.getAll('genre');

    const filters: any = {};
    if (opuses.length) filters.opuses = opuses;
    if (genres.length) filters.genres = genres;

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
