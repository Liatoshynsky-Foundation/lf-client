import { NextResponse } from 'next/server';
import { validateContactData } from '~/lib/utils/validateContactData';

export async function POST(request: Request) {
  const data = await request.json();
  const errors = validateContactData(data);

  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
