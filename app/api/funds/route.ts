import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import logger from '~/middleware/logger/logger';

const parsePositiveInteger = (value: string): number | null => {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }

  return Number(value);
};

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const fundId = params.get('id');
    const caseId = params.get('caseId');

    const fundsService = createRequestContainer().resolve('fundsService');

    if (!fundId && !caseId) {
      const funds = await fundsService.getFunds();
      return NextResponse.json({ success: true, data: funds });
    }

    if (caseId) {
      const caseDetails = await fundsService.getCaseById(caseId);

      if (!caseDetails) {
        return NextResponse.json({ success: false, error: errors.NOT_FOUND }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: caseDetails });
    }

    if (fundId) {
      const id = parsePositiveInteger(fundId);

      if (id === null) {
        return NextResponse.json({ success: false, error: errors.VALIDATION_ERROR }, { status: 400 });
      }

      const fund = await fundsService.getFundById(id);

      if (!fund) {
        return NextResponse.json({ success: false, error: errors.NOT_FOUND }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: fund });
    }
  } catch (error) {
    logger.error('[API:GET:funds] Critical error while fetching funds/cases data', error);

    return NextResponse.json({ success: false, error: errors.FUNDS_FETCH_FAILED }, { status: 500 });
  }
}
