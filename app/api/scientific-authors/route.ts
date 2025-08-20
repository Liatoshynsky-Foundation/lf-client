import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET() {
  const authors = await createRequestContainer().resolve('scientificService').getAllAuthors();
  return NextResponse.json(authors);
}
