import { NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import logger from '~/middleware/logger/logger';

export async function GET() {
  try {
    const container = createRequestContainer();
    const researchWorksService = container.resolve('researchService');

    const yearRange = await researchWorksService.getResearchWorksYearRange();

    return NextResponse.json({ yearRange });
  } catch (error) {
    logger.error('[API:GET:research-works:filters] Failed to fetch research works filters', error);

    return NextResponse.json(
      {
        code: errors.FILTERS_FETCH_FAILED.code,
        message: errors.FILTERS_FETCH_FAILED.message
      },
      { status: 500 }
    );
  }
}
