if (typeof global.Request === 'undefined') {
  (global as any).Request = class {
    constructor(
      public input: any,
      public init?: any
    ) {
      this.json = async () => JSON.parse(input);
    }
    json: () => Promise<any>;
  } as any;
  (global as any).Response = class {} as any;
}

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: jest.fn(),
  successResponse: jest.fn()
}));

jest.mock('~/utils/validateRequestData', () => ({
  validateRequestData: jest.fn()
}));

jest.mock('~/services/email/emailService', () => ({
  emailService: {
    sendCollaborationEmail: jest.fn()
  }
}));

import { POST } from './route';
import { errorResponse, successResponse } from '~/utils/apiResponse';
import { validateRequestData } from '~/utils/validateRequestData';

import { emailService } from '~/services/email/emailService';

describe('Collaboration API Route (POST)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send email successfully when data is valid', async () => {
    (validateRequestData as jest.Mock).mockReturnValue({
      valid: true,
      value: {
        name: 'Test User',
        email: 'test@example.com',
        phoneNumber: '12345',
        message: 'Hello'
      }
    });

    (emailService.sendCollaborationEmail as jest.Mock).mockResolvedValue({
      success: true,
      previewUrl: 'https://preview.com'
    });

    const mockReq = {
      json: async () => ({ name: 'Test User' })
    };

    await POST(mockReq as any);

    expect(validateRequestData).toHaveBeenCalled();
    expect(emailService.sendCollaborationEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test User'
      })
    );
    expect(successResponse).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, previewUrl: 'https://preview.com' }),
      200
    );
  });

  it('should return 400 when validation fails', async () => {
    (validateRequestData as jest.Mock).mockReturnValue({
      valid: false,
      errors: ['Invalid email']
    });

    const mockReq = { json: async () => ({}) };

    await POST(mockReq as any);

    expect(errorResponse).toHaveBeenCalledWith(['Invalid email'], 400);
    expect(emailService.sendCollaborationEmail).not.toHaveBeenCalled();
  });

  it('should return 500 when email service fails', async () => {
    (validateRequestData as jest.Mock).mockReturnValue({
      valid: true,
      value: { name: 'Test' }
    });

    (emailService.sendCollaborationEmail as jest.Mock).mockResolvedValue({
      success: false
    });

    const mockReq = { json: async () => ({}) };

    await POST(mockReq as any);

    expect(errorResponse).toHaveBeenCalledWith([expect.stringContaining('Failed to send email')], 500);
  });

  it('should handle unexpected errors with catch block', async () => {
    const mockReq = {
      json: async () => {
        throw new Error('Crashed');
      }
    };

    await POST(mockReq as any);

    expect(errorResponse).toHaveBeenCalledWith([expect.stringContaining('unexpected error')], 500);
  });
});
