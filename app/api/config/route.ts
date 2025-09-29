import { NextResponse } from 'next/server';

export async function GET() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY;
  return NextResponse.json({ turnstileSiteKey });
}
