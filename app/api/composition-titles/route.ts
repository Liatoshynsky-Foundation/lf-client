'use server';
import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET() {
  const titles = await createRequestContainer().resolve('artistryService').getAllTitles();
  return NextResponse.json(titles);
}
