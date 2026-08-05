import { DEFAULT_COMPOSITION_SOURCE_URL } from '~/constants/audioPlayer';

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

jest.mock('~/middleware/logger/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn()
  }
}));

describe('Default composition audio route', () => {
  let GET: typeof import('./route').GET;
  const fetchMock = jest.fn();

  beforeAll(async () => {
    global.Headers = TestHeaders as unknown as typeof Headers;
    global.Response = TestResponse as unknown as typeof Response;
    global.fetch = fetchMock;
    ({ GET } = await import('./route'));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should stream the R2 default audio through the same-origin route', async () => {
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
      headers: { get: (name: string) => (name === 'range' ? 'bytes=0-41' : null) }
    } as Request);

    expect(fetchMock).toHaveBeenCalledWith(DEFAULT_COMPOSITION_SOURCE_URL, {
      method: 'GET',
      headers: { Range: 'bytes=0-41' },
      next: { revalidate: 0 }
    });
    expect(response.status).toBe(206);
    expect(response.headers.get('Content-Type')).toBe('audio/mpeg');
    expect(response.headers.get('Content-Range')).toBe('bytes 0-41/42');
    expect(response.headers.get('Accept-Ranges')).toBe('bytes');
  });

  it('should default accept-ranges to bytes when R2 omits it', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('audio-data', {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg'
        }
      })
    );

    const response = await GET({ headers: { get: () => null } } as unknown as Request);

    expect(fetchMock).toHaveBeenCalledWith(DEFAULT_COMPOSITION_SOURCE_URL, {
      method: 'GET',
      headers: {},
      next: { revalidate: 0 }
    });
    expect(response.headers.get('Accept-Ranges')).toBe('bytes');
  });

  it('should return 502 when the R2 request fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('R2 unavailable'));

    const response = await GET({ headers: { get: () => null } } as unknown as Request);

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ message: 'Failed to stream default composition audio' });
  });
});
