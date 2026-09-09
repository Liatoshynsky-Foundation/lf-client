import { NextRequest, NextResponse } from 'next/server';

import { errors } from '~/constants/errors';
import { LocalizedString } from '~/types/types/common.types';

import { createRequestContainer } from '~/di/container';
import logger from '~/middleware/logger/logger';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const fundId = params.get('id');
    const caseId = params.get('caseId');
    const lang: 'uk' | 'en' = (params.get('lang') as 'uk' | 'en') || 'uk';

    const fundsService = createRequestContainer().resolve('fundsService');
    type FundData = {
      id: number;
      title: LocalizedString;
      [key: string]: unknown;
    };

    if (!fundId && !caseId) {
      const funds = await fundsService.getFunds();
      const translatedFunds = funds.map((fund: FundData) => ({
        ...fund,
        number: lang === 'en' ? `Fund ${fund.id}` : `Фонд ${fund.id}`,
        title: fund.title?.[lang] || ''
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
        number: lang === 'en' ? `Fund ${fund.id}` : `Фонд ${fund.id}`,
        title: fund.title?.[lang] || ''
      };

      return NextResponse.json({ success: true, data: translatedFund });
    }
  } catch (error) {
    logger.error('[API:GET:funds] Critical error while fetching funds/cases data', error);

    return NextResponse.json({ success: false, error: errors.FUNDS_FETCH_FAILED }, { status: 500 });
  }
}
