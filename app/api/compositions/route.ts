'use server';
import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang')!;
  const search = searchParams.get('search') || '';

  const compositions = await createRequestContainer().resolve('artistryService').getAllCompositions(lang, search);
  return NextResponse.json(compositions);
}
