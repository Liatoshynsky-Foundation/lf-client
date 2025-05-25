import { successResponse, errorResponse } from '~/lib/utils/apiResponse';
import { validateContactData } from '~/lib/utils/validateContactData';

export async function POST(request: Request) {
  const data = await request.json();
  const errors = validateContactData(data);

  if (errors.length > 0) {
    return errorResponse(errors, 400);
  }

  return successResponse({ data, success: true });
}
