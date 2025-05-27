import { errors } from '~/constants/errors';

describe('mongoUrl', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns localhost mongo url', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'localhost';
    process.env.MONGO_PORT = '27018';

    const { mongoUrl } = await import('~/config/index');
    expect(mongoUrl).toBe('mongodb://localhost:27018/testdb');
  });

  it('returns default port if MONGO_PORT is not set', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'localhost';
    delete process.env.MONGO_PORT;

    const { mongoUrl } = await import('~/config/index');
    expect(mongoUrl).toBe('mongodb://localhost:27017/testdb');
  });

  it('returns remote mongo url with credentials', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'remotehost';
    process.env.MONGO_USERNAME = 'user';
    process.env.MONGO_PASSWORD = 'pass';

    const { mongoUrl } = await import('~/config/index');
    expect(mongoUrl).toBe('mongodb+srv://user:pass@remotehost/testdb');
  });

  it('throws error if MONGO_DB or MONGO_HOST missing', async () => {
    delete process.env.MONGO_DB;
    process.env.MONGO_HOST = 'localhost';

    await expect(import('~/config/index')).rejects.toThrow(
      errors.MISSING_DB_OR_HOST,
    );
  });

  it('throws error if credentials are missing for remote mongo', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'remotehost';
    delete process.env.MONGO_USERNAME;
    delete process.env.MONGO_PASSWORD;

    await expect(import('~/config/index')).rejects.toThrow(
      errors.MISSING_CREDENTIALS,
    );
  });
});