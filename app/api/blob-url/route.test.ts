import * as util from 'util';

if (typeof global.TextDecoder === 'undefined') {
  (global as any).TextDecoder = util.TextDecoder;
  (global as any).TextEncoder = util.TextEncoder;
}

if (typeof global.Request === 'undefined') {
  (global as any).Request = class {
    constructor(public url: string) {}
    headers = { get: () => null };
  };
}
const mockConstructBlobUrl = jest.fn();
const mockStreamBlob = jest.fn();
jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: () => ({
      constructBlobUrl: mockConstructBlobUrl,
      streamBlob: mockStreamBlob
    })
  }))
}));

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: jest.fn(),
  successResponse: jest.fn()
}));
jest.mock('~/middleware/logger/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  },
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));
jest.mock('~/utils/validateRequestData', () => ({
  validateWithZod: jest.fn()
}));

describe('Blob URL API Route', () => {
  let GET: any;
  let validateWithZod: any;
  let errorResponse: any;

  beforeAll(async () => {
    const route = await import('./route');
    const validate = await import('~/utils/validateRequestData');
    const apiRes = await import('~/utils/apiResponse');

    GET = route.GET;
    validateWithZod = validate.validateWithZod;
    errorResponse = apiRes.errorResponse;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pass validation and call streamBlob', async () => {
    validateWithZod.mockReturnValue({
      valid: true,
      value: { blobName: 'video.mp4', folderName: 'movies' }
    });

    const mockReq = {
      url: 'http://localhost/api/blob-url?blobName=video.mp4',
      headers: { get: () => null }
    };

    await GET(mockReq as any);

    expect(validateWithZod).toHaveBeenCalled();
    expect(errorResponse).not.toHaveBeenCalled();
  });
  it('should return 503 error when service fails (lines 28-30)', async () => {
    validateWithZod.mockReturnValue({
      valid: true,
      value: { blobName: 'critical-error.mp4' }
    });

    mockConstructBlobUrl.mockImplementationOnce(() => {
      throw new Error('Azure Service Unavailable');
    });

    const mockReq = {
      url: 'http://localhost/api/blob-url?blobName=error',
      headers: { get: () => null }
    };

    await GET(mockReq as any);

    expect(errorResponse).toHaveBeenCalled();
    expect(errorResponse).toHaveBeenCalledWith(expect.any(Array), 503);
  });
  it('should return errorResponse when validation fails', async () => {
    validateWithZod.mockReturnValue({
      valid: false,
      errors: ['Invalid name']
    });

    const mockReq = {
      url: 'http://localhost/api/blob-url',
      headers: { get: () => null }
    };

    await GET(mockReq as any);

    expect(errorResponse).toHaveBeenCalledWith(['Invalid name']);
  });
});
