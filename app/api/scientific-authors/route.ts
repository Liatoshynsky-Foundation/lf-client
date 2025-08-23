import { NextRequest, NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get('locale') || 'uk';
  const search = req.nextUrl.searchParams.get('search') || '';

  const authors = await createRequestContainer().resolve('scientificService').getAllAuthors(locale, search);

  return NextResponse.json(authors);
}
