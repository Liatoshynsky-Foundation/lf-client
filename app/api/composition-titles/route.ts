'use server';
import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const lang = "uk";

  console.log('lang:', lang);
  const titles = await createRequestContainer().resolve('artistryService').getAllCompositionTitles(lang);
  return NextResponse.json(titles);
}
