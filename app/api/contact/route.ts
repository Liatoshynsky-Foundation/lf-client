import { successResponse, errorResponse } from '~/lib/utils/apiResponse';
import {
  validateContactData,
  type ContactFormData,
} from '~/lib/utils/validateContactData';
import { validateRequestData } from '~/lib/utils/validateRequestData';

export async function POST(request: Request) {
  const data = await request.json();

  const validationResult = validateRequestData<ContactFormData>(
    data,
    validateContactData,
  );

  if (!validationResult.valid) {
    return errorResponse(validationResult.errors);
  }

  const { value } = validationResult;

  return successResponse({ data: value, success: true });
}
