import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const fundId = params.get('id');
    const caseId = params.get('caseId');
    const lang = params.get('lang') || 'uk';

    const fundsService = createRequestContainer().resolve('fundsService');
    type FundData = {
      number: string | Record<string, string>;
      title: string | Record<string, string>;
      [key: string]: unknown;
    };
    if (!fundId && !caseId) {
      const funds = await fundsService.getFunds();
      const translatedFunds = funds.map((fund: FundData) => ({
        ...fund,
        number: typeof fund.number === 'object' ? fund.number[lang] : fund.number,
        title: typeof fund.title === 'object' ? fund.title[lang] : fund.title
      }));
      return NextResponse.json({ success: true, data: translatedFunds });
    }

    if (caseId) {
      const caseDetails = await fundsService.getCaseById(caseId);

      if (!caseDetails) {
        return NextResponse.json({ success: false, error: errors.NOT_FOUND }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: caseDetails });
    }

    if (fundId) {
      const id = Number.parseInt(fundId, 10);

      if (Number.isNaN(id)) {
        return NextResponse.json({ success: false, error: errors.VALIDATION_ERROR }, { status: 400 });
      }

      const fund = await fundsService.getFundById(id);

      if (!fund) {
        return NextResponse.json({ success: false, error: errors.NOT_FOUND }, { status: 404 });
      }
      const translatedFund = {
        ...fund,
        number: typeof fund.number === 'object' ? fund.number[lang] : fund.number,
        title: typeof fund.title === 'object' ? fund.title[lang] : fund.title
      };
      return NextResponse.json({ success: true, data: translatedFund });
    }
  } catch {
    return NextResponse.json({ success: false, error: errors.FUNDS_FETCH_FAILED }, { status: 500 });
  }
}
