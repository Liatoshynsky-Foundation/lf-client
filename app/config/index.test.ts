describe('mongoUrl', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return localhost mongo url', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'localhost';
    process.env.MONGO_PORT = '27018';
    process.env.MONGO_USERNAME = 'user';
    process.env.MONGO_PASSWORD = 'fake-pass'; //NOSONAR

    const { mongoUrl } = await import('~/config/index');
    expect(mongoUrl).toBe('mongodb://localhost:27018/testdb');
  });

  it('should return default port if MONGO_PORT is not set', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'localhost';
    delete process.env.MONGO_PORT;
    process.env.MONGO_USERNAME = 'user';
    process.env.MONGO_PASSWORD = 'fake-pass'; //NOSONAR

    const { mongoUrl } = await import('~/config/index');
    expect(mongoUrl).toBe('mongodb://localhost:27017/testdb');
  });

  it('should return remote mongo url with credentials', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'remotehost';
    process.env.MONGO_USERNAME = 'user';
    process.env.MONGO_PASSWORD = 'fake-pass'; //NOSONAR

    const { mongoUrl } = await import('~/config/index');
    expect(mongoUrl).toBe('mongodb+srv://user:fake-pass@remotehost/testdb');
  });
});
