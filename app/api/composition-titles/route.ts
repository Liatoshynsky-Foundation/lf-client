'use server';
import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET() {
  const titles = await createRequestContainer().resolve('artistryService').getAllCompositionTitles();
  return NextResponse.json(titles);
}
