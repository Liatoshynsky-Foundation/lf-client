'use server';
import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = 'en';
  const search = searchParams.get('search') || '';

  const compositions = await createRequestContainer().resolve('artistryService').getAllCompositions(lang, search);
  console.log('compositions', compositions);
  return NextResponse.json(compositions);
}
