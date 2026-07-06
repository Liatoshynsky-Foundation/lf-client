import { RateLimiterMongo } from 'rate-limiter-flexible';

import { POST } from './route';
import { errorResponse, successResponse } from '~/utils/apiResponse';

import { emailService } from '~/services/email/emailService';
import { contactApiSchema } from '~/validators/contact.schema';

jest.mock('mongoose', () => ({
  connection: { readyState: 1 }
}));

jest.mock('rate-limiter-flexible', () => {
  return {
    RateLimiterMongo: jest.fn().mockImplementation(() => ({
      consume: jest.fn().mockResolvedValue(true)
    }))
  };
});

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: jest.fn(),
  successResponse: jest.fn()
}));

jest.mock('~/services/email/emailService', () => ({
  emailService: {
    sendCollaborationEmail: jest.fn()
  }
}));

jest.mock('~/validators/contact.schema', () => ({
  contactApiSchema: {
    parse: jest.fn()
  }
}));

const mockRequest = (body: any, ip: string = '127.0.0.1') => {
  return {
    json: async () => body,
    headers: {
      get: (key: string) => (key === 'x-forwarded-for' ? ip : null)
    }
  } as unknown as Request;
};

describe('Collaboration API Route (POST)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 429 if rate limit is exceeded', async () => {
    const mockConsume = jest.fn().mockRejectedValue(new Error('Rate limit exceeded'));
    (RateLimiterMongo as jest.Mock).mockImplementationOnce(() => ({
      consume: mockConsume
    }));

    const req = mockRequest({});
    await POST(req);

    expect(mockConsume).toHaveBeenCalledWith('127.0.0.1');
    expect(errorResponse).toHaveBeenCalledWith(['Забагато запитів. Спробуйте пізніше.'], 429);
  });

  it('should return 400 if validation fails (ZodError)', async () => {
    const zodError = new Error('Validation failed');
    zodError.name = 'ZodError';
    (contactApiSchema.parse as jest.Mock).mockImplementation(() => {
      throw zodError;
    });

    const req = mockRequest({ name: 'A' });
    await POST(req);

    expect(errorResponse).toHaveBeenCalledWith(['Invalid form data.'], 400);
    expect(emailService.sendCollaborationEmail).not.toHaveBeenCalled();
  });

  it('should return 500 if email service fails', async () => {
    (contactApiSchema.parse as jest.Mock).mockReturnValue({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });

    (emailService.sendCollaborationEmail as jest.Mock).mockResolvedValue({
      success: false
    });

    const req = mockRequest({});
    await POST(req);

    expect(errorResponse).toHaveBeenCalledWith(['Failed to send email. Please try again later.'], 500);
  });

  it('should sanitize message and return 200 on success', async () => {
    (contactApiSchema.parse as jest.Mock).mockReturnValue({
      name: 'Test',
      email: 'test@example.com',
      phoneNumber: '12345',
      message: 'Hello <script>alert(1)</script>'
    });

    (emailService.sendCollaborationEmail as jest.Mock).mockResolvedValue({
      success: true
    });

    const req = mockRequest({});
    await POST(req);

    expect(emailService.sendCollaborationEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Hello scriptalert(1)/script'
      })
    );

    expect(successResponse).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, message: 'Your collaboration request has been sent successfully.' }),
      200
    );
  });
});
