'use server';
import { NextResponse } from 'next/server';

import { createRequestContainer } from '~/di/container';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const yearsParam = searchParams.get('years');
  const authorIdsParam = searchParams.get('authorIds');
  const title = searchParams.get('title') || '';

  let years: number[] = [];

  if (yearsParam) {
    years = yearsParam
      .split(',')
      .map((y) => parseInt(y, 10))
      .filter((y) => !isNaN(y));
  }
  const authorIds = authorIdsParam ? authorIdsParam.split(',').filter((id) => id.trim() !== '') : [];

  const scientificWorks = await createRequestContainer()
    .resolve('scientificService')
    .getAllScientificWorks({ years, authorIds, title });

  return NextResponse.json(scientificWorks);
}
