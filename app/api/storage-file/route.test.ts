import * as util from 'util';

if (typeof global.TextDecoder === 'undefined') {
  (global as any).TextDecoder = util.TextDecoder;
  (global as any).TextEncoder = util.TextEncoder;
}

class TestHeaders {
  private readonly values = new Map<string, string>();

  constructor(init?: Record<string, string>) {
    Object.entries(init ?? {}).forEach(([key, value]) => this.set(key, value));
  }

  get(name: string) {
    return this.values.get(name.toLowerCase()) ?? null;
  }

  set(name: string, value: string) {
    this.values.set(name.toLowerCase(), value);
  }
}

class TestResponse {
  readonly body: BodyInit | null;
  readonly headers: TestHeaders;
  readonly status: number;
  readonly statusText: string;
  private readonly jsonData?: unknown;

  constructor(body: BodyInit | null, init?: ResponseInit & { jsonData?: unknown }) {
    this.body = body;
    this.headers =
      init?.headers instanceof TestHeaders ? init.headers : new TestHeaders(init?.headers as Record<string, string>);
    this.status = init?.status ?? 200;
    this.statusText = init?.statusText ?? '';
    this.jsonData = init?.jsonData;
  }

  static json(data: unknown, init?: ResponseInit) {
    return new TestResponse(null, { ...init, jsonData: data });
  }

  async json() {
    return this.jsonData;
  }
}

jest.mock('~/utils/apiResponse', () => ({
  errorResponse: jest.fn((errors: string[], status = 400) => Response.json({ errors }, { status }))
}));

jest.mock('~/middleware/logger/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn()
  }
}));

describe('Storage file route', () => {
  let GET: typeof import('./route').GET;
  const fetchMock = jest.fn();
  const originalStorageBaseUrl = process.env.STORAGE_BASE_URL;
  const originalPublicStorageBaseUrl = process.env.NEXT_PUBLIC_STORAGE_BASE_URL;
  const originalGlobals = {
    Headers: global.Headers,
    Response: global.Response,
    fetch: global.fetch
  };

  beforeAll(async () => {
    global.Headers = TestHeaders as unknown as typeof Headers;
    global.Response = TestResponse as unknown as typeof Response;
    global.fetch = fetchMock;
    ({ GET } = await import('./route'));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.STORAGE_BASE_URL = 'https://pub-test.r2.dev';
    delete process.env.NEXT_PUBLIC_STORAGE_BASE_URL;
  });

  afterAll(() => {
    process.env.STORAGE_BASE_URL = originalStorageBaseUrl;
    process.env.NEXT_PUBLIC_STORAGE_BASE_URL = originalPublicStorageBaseUrl;
    global.Headers = originalGlobals.Headers;
    global.Response = originalGlobals.Response;
    global.fetch = originalGlobals.fetch;
  });

  it('should stream an R2 file through the same-origin route', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('audio-data', {
        status: 206,
        statusText: 'Partial Content',
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': '42',
          'Content-Range': 'bytes 0-41/42',
          'Accept-Ranges': 'bytes'
        }
      })
    );

    const response = await GET({
      url: 'http://localhost/api/storage-file?folderName=compositions&fileName=poema-pro-lis.mp3',
      headers: { get: (name: string) => (name === 'range' ? 'bytes=0-41' : null) }
    } as unknown as Request);

    expect(fetchMock).toHaveBeenCalledWith('https://pub-test.r2.dev/compositions/poema-pro-lis.mp3', {
      method: 'GET',
      headers: { Range: 'bytes=0-41' },
      next: { revalidate: 0 }
    });
    expect(response.status).toBe(206);
    expect(response.headers.get('Content-Type')).toBe('audio/mpeg');
    expect(response.headers.get('Content-Range')).toBe('bytes 0-41/42');
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=604800, immutable');
  });

  it('should stream without range headers and default missing upstream headers', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('file-data', {
        status: 200,
        statusText: 'OK'
      })
    );

    const response = await GET({
      url: 'http://localhost/api/storage-file?folderName=photos&fileName=poster.png',
      headers: { get: () => null }
    } as unknown as Request);

    expect(fetchMock).toHaveBeenCalledWith('https://pub-test.r2.dev/photos/poster.png', {
      method: 'GET',
      headers: {},
      next: { revalidate: 0 }
    });
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBeNull();
    expect(response.headers.get('Content-Length')).toBeNull();
    expect(response.headers.get('Content-Range')).toBeNull();
    expect(response.headers.get('Accept-Ranges')).toBe('bytes');
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=604800, immutable');
  });

  it('should preserve nested path delimiters while encoding path segments', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('file-data', {
        status: 200
      })
    );

    await GET({
      url: 'http://localhost/api/storage-file?folderName=compositions&fileName=subfolder/audio%20file.mp3',
      headers: { get: () => null }
    } as unknown as Request);

    expect(fetchMock).toHaveBeenCalledWith('https://pub-test.r2.dev/compositions/subfolder/audio%20file.mp3', {
      method: 'GET',
      headers: {},
      next: { revalidate: 0 }
    });
  });

  it('should not cache R2 error responses as immutable', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('too many requests', {
        status: 429,
        statusText: 'Too Many Requests',
        headers: {
          'Content-Type': 'text/plain'
        }
      })
    );

    const response = await GET({
      url: 'http://localhost/api/storage-file?folderName=photos&fileName=poster.png',
      headers: { get: () => null }
    } as unknown as Request);

    expect(response.status).toBe(429);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it('should return validation errors for invalid query params', async () => {
    const response = await GET({
      url: 'http://localhost/api/storage-file?folderName=compositions',
      headers: { get: () => null }
    } as unknown as Request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ errors: expect.any(Array) });
  });

  it('should return 502 when storage base URL is missing', async () => {
    delete process.env.STORAGE_BASE_URL;
    delete process.env.NEXT_PUBLIC_STORAGE_BASE_URL;

    const response = await GET({
      url: 'http://localhost/api/storage-file?folderName=compositions&fileName=poema-pro-lis.mp3',
      headers: { get: () => null }
    } as unknown as Request);

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ message: 'Failed to stream file from storage' });
  });
});
