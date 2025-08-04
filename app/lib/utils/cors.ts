import { NextResponse } from 'next/server';

export function withCORS(origin: string, response: NextResponse) {
  if (origin && origin !== '*') {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
}

export function corsError(origin: string, response: NextResponse) {
  return withCORS(origin, response);
}
