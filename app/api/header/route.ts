import { NextRequest, NextResponse } from 'next/server';
import { type Locale } from 'next-intl';
import { ZodError } from 'zod';

import { errors, loggerErrors } from '~/constants/errors';

import { createRequestContainer } from '~/di/container';
import logger from '~/middleware/logger/logger';
import { ResponseError } from '~/shared/exceptions/errors/responseError';

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get('locale') || 'uk';

  try {
    const container = createRequestContainer();
    const headerService = container.resolve('headerService');
    const headerData = await headerService.getHeaderData(locale as Locale);

    return NextResponse.json(headerData);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(loggerErrors.ZOD_VALIDATION_ERROR, error);
      const { code, message, status } = errors.VALIDATION_ERROR;

      return NextResponse.json({ code, message, details: error.flatten() }, { status });
    }
    if (error instanceof ResponseError) {
      return NextResponse.json({ code: error.code, message: error.message, details: error.details }, { status: 502 });
    }

    const { code, message, status } = errors.SERVER_ERROR;
    logger.error(loggerErrors.UNEXPECTED_HEADER_ERROR, error);

    return NextResponse.json({ code, message }, { status });
  }
}
