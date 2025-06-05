import { successResponse, errorResponse } from '~/utils/apiResponse';
import { validateContactData, type ContactFormData } from '~/utils/validateContactData';
import { validateRequestData } from '~/utils/validateRequestData';

export async function POST(request: Request) {
  const data = await request.json();

  const validationResult = validateRequestData<ContactFormData>(data, validateContactData);

  if (!validationResult.valid) {
    return errorResponse(validationResult.errors);
  }

  const { value } = validationResult;

  return successResponse({ data: value, success: true });
}
