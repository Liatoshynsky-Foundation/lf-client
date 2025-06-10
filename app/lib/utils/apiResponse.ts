import { NextResponse } from 'next/server';

interface ErrorResponse {
  success: false;
  errors: string[] | Record<string, unknown>;
}

export const successResponse = (data: unknown, status: number = 200) => {
  return NextResponse.json(data, { status });
};

export const errorResponse = (
  errors: string[] | Record<string, unknown>,
  status: number = 400
): NextResponse<ErrorResponse> => {
  return NextResponse.json({ success: false, errors }, { status });
};
