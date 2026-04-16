jest.mock(
  '../funds/openapi.json',
  () => ({
    paths: { '/test-path': { get: {} } },
    components: { schemas: { TestSchema: {} } }
  }),
  { virtual: true }
);

describe('Docs API Route (GET)', () => {
  let GET: any;

  beforeAll(async () => {
    if (typeof global.Response === 'undefined') {
      (global as any).Response = {
        json: jest.fn((data) => ({ _testData: data, status: 200 }))
      } as any;
    }

    const routeModule = await import('./route');
    GET = routeModule.GET;
  });

  it('should return merged OpenAPI specification', async () => {
    const res = await GET();

    expect(res._testData.info.title).toBe('Liatoshynsky Foundation API');
    expect(res._testData.paths).toHaveProperty('/test-path');
    expect(res._testData.components.schemas).toHaveProperty('TestSchema');
  });
});
