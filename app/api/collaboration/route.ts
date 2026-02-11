import { errorResponse, successResponse } from '~/utils/apiResponse';
import { type ContactFormData, validateContactData } from '~/utils/validateContactData';
import { validateRequestData } from '~/utils/validateRequestData';

import { emailService } from '~/services/email/emailService';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const validationResult = validateRequestData<ContactFormData>(data, validateContactData);

    if (!validationResult.valid) {
      return errorResponse(validationResult.errors, 400);
    }

    const { value } = validationResult;

    const emailResult = await emailService.sendCollaborationEmail({
      name: value.name as string,
      email: value.email as string,
      phoneNumber: value.phoneNumber as string | undefined,
      message: value.message as string
    });

    if (!emailResult.success) {
      return errorResponse(['Failed to send email. Please try again later.'], 500);
    }

    return successResponse(
      {
        success: true,
        message: 'Your collaboration request has been sent successfully.',
        ...(emailResult.previewUrl && { previewUrl: emailResult.previewUrl })
      },
      200
    );
  } catch (error) {
    console.error('Error processing collaboration request:', error);
    return errorResponse(['An unexpected error occurred. Please try again later.'], 500);
  }
}
