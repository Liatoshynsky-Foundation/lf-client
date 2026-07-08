import mongoose from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';

import { errorResponse, successResponse } from '~/utils/apiResponse';

import { emailService } from '~/services/email/emailService';
import { contactApiSchema } from '~/validators/contact.schema';

interface CollaborationApiResponse {
  success: boolean;
  message: string;
}

const getRateLimiter = () => {
  if (mongoose.connection.readyState !== 1) return null;
  return new RateLimiterMongo({
    storeClient: mongoose.connection,
    points: 3,
    duration: 15 * 60,
    keyPrefix: 'contact_form_limits'
  });
};

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const limiter = getRateLimiter();

    if (limiter) {
      try {
        await limiter.consume(ip);
      } catch {
        return errorResponse(['Забагато запитів. Спробуйте пізніше.'], 429);
      }
    }

    const body = await request.json();
    const { data, formType } = body;

    const validatedData = contactApiSchema.parse({ ...data, formType });

    const safeMessage = validatedData.message.replace(/[<>]/g, '');

    const emailResult = await emailService.sendContactEmail(
      {
        name: validatedData.name,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber,
        message: safeMessage
      },
      validatedData.formType
    );

    if (!emailResult.success) {
      return errorResponse(['Failed to send email. Please try again later.'], 500);
    }

    const payload: CollaborationApiResponse = {
      success: true,
      message: 'Your collaboration request has been sent successfully.'
    };

    return successResponse(payload, 200);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      console.log(error);
      return errorResponse(['Invalid form data.'], 400);
    }
    return errorResponse(['An unexpected error occurred.'], 500);
  }
}
