import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const fundId = params.get('id');
    const caseId = params.get('caseId');

    const fundsService = createRequestContainer().resolve('fundsService');

    if (caseId) {
      const caseDetails = await fundsService.getCaseById(caseId);

      if (!caseDetails) {
        return NextResponse.json({ success: false, error: errors.NOT_FOUND }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: caseDetails });
    }

    if (fundId) {
      const id = parseInt(fundId, 10);

      if (isNaN(id)) {
        return NextResponse.json({ success: false, error: errors.VALIDATION_ERROR }, { status: 400 });
      }

      const fund = await fundsService.getFundById(id);

      if (!fund) {
        return NextResponse.json({ success: false, error: errors.NOT_FOUND }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: fund });
    }

    const funds = await fundsService.getFunds();
    return NextResponse.json({ success: true, data: funds });
  } catch {
    return NextResponse.json({ success: false, error: errors.FUNDS_FETCH_FAILED }, { status: 500 });
  }
}
