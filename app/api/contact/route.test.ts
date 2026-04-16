jest.mock('~/utils/apiResponse', () => ({
  errorResponse: jest.fn((errors: string[]) => ({ _testErrors: errors, status: 400 })),
  successResponse: jest.fn((data: any) => ({ _testData: data, status: 200 }))
}));

jest.mock('~/utils/validateRequestData', () => ({
  validateRequestData: jest.fn()
}));

describe('Contact API Route (POST)', () => {
  let POST: any;
  let apiUtils: any;
  let valUtils: any;

  beforeAll(async () => {
    if (typeof global.Request === 'undefined') {
      (global as any).Request = class {
        constructor(public input: string) {}
        json = async () => JSON.parse(this.input);
      } as any;
    }

    const routeModule = await import('./route');
    POST = routeModule.POST;

    apiUtils = await import('~/utils/apiResponse');
    valUtils = await import('~/utils/validateRequestData');
  });

  beforeEach(() => jest.clearAllMocks());

  it('should return success when data is valid', async () => {
    valUtils.validateRequestData.mockReturnValue({
      valid: true,
      value: { name: 'Admin', email: 'admin@test.com' }
    });

    const mockReq = {
      json: async () => ({ name: 'Admin' })
    };

    const res = await POST(mockReq as any);

    expect(apiUtils.successResponse).toHaveBeenCalledWith({
      data: { name: 'Admin', email: 'admin@test.com' },
      success: true
    });
    expect(res.status).toBe(200);
  });

  it('should return errorResponse with array when validation fails', async () => {
    valUtils.validateRequestData.mockReturnValue({
      valid: false,
      errors: ['Invalid email format']
    });

    const mockReq = { json: async () => ({}) };

    const res = await POST(mockReq as any);

    expect(apiUtils.errorResponse).toHaveBeenCalledWith(['Invalid email format']);
    expect(res._testErrors).toEqual(['Invalid email format']);
    expect(res.status).toBe(400);
  });
});
