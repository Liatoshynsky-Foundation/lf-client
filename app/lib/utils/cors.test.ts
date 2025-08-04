import { corsError, withCORS } from './cors';

describe('CORS utilities', () => {
  it('should set CORS headers when origin is not *', () => {
    const response = createMockResponse();
    const updatedResponse = withCORS('https://example.com', response);

    expect(updatedResponse.headers.get('Access-Control-Allow-Origin')).toBe('https://example.com');
    expect(updatedResponse.headers.get('Access-Control-Allow-Credentials')).toBe('true');
  });

  it('should not set CORS headers when origin is *', () => {
    const response = createMockResponse();
    const updatedResponse = withCORS('*', response);

    expect(updatedResponse.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(updatedResponse.headers.get('Access-Control-Allow-Credentials')).toBeNull();
  });

  it('should work the same for corsError as withCORS', () => {
    const response = createMockResponse();
    const updatedResponse = corsError('https://example.com', response);

    expect(updatedResponse.headers.get('Access-Control-Allow-Origin')).toBe('https://example.com');
    expect(updatedResponse.headers.get('Access-Control-Allow-Credentials')).toBe('true');
  });
});

function createMockResponse() {
  const headers = new Map<string, string>();
  return {
    headers: {
      set: (key: string, value: string) => headers.set(key, value),
      get: (key: string) => headers.get(key) || null
    }
  } as any;
}
