import { errorResponse, successResponse } from '~/utils/apiResponse';

import { WayForPay } from '~/config';

export async function POST(request: Request) {
  const { token } = await request.json();

  const secretKey = WayForPay.TURNSTILE_SECRET_KEY;
  const verifyURL = WayForPay.VERIFY_URL;

  if (!token || !secretKey || !verifyURL) {
    return errorResponse(['missing-input']);
  }
  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);

  const result = await fetch(verifyURL, {
    method: 'POST',
    body: formData
  });

  const data = await result.json();

  if (data.success) {
    return successResponse({ success: true });
  } else {
    return errorResponse(['missing-input']);
  }
}
