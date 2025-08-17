'use server';
import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang')!;
  const titles = await createRequestContainer().resolve('artistryService').getAllCompositionTitles(lang);
  return NextResponse.json(titles);
}
