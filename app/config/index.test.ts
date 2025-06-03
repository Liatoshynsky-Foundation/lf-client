import { envErrors } from '~/constants/errors';

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
    process.env.MONGO_USERNAME = 'dummy';
    process.env.MONGO_PASSWORD = 'dummy'; //NOSONAR

    const { mongoUrl } = await import('~/config/index');
    expect(mongoUrl).toBe('mongodb://localhost:27018/testdb');
  });

  it('returns default port if MONGO_PORT is not set', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'localhost';
    delete process.env.MONGO_PORT;
    process.env.MONGO_USERNAME = 'user';
    process.env.MONGO_PASSWORD = 'fake-pass'; //NOSONAR

    const { mongoUrl } = await import('~/config/index');
    expect(mongoUrl).toBe('mongodb://localhost:27017/testdb');
  });

  it('returns remote mongo url with credentials', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'remotehost';
    process.env.MONGO_USERNAME = 'user';
    process.env.MONGO_PASSWORD = 'fake-pass'; //NOSONAR

    const { mongoUrl } = await import('~/config/index');
    expect(mongoUrl).toBe('mongodb+srv://user:fake-pass@remotehost/testdb');
  });

  it('throws Zod error if MONGO_DB is missing', async () => {
    delete process.env.MONGO_DB;
    process.env.MONGO_HOST = 'localhost';
    process.env.MONGO_USERNAME = 'user';
    process.env.MONGO_PASSWORD = 'fake-pass'; //NOSONAR

    await expect(import('~/config/index')).rejects.toThrow(envErrors.MONGO_DB.REQUIRED);
  });

  it('throws Zod error if MONGO_HOST is missing', async () => {
    process.env.MONGO_DB = 'testdb';
    delete process.env.MONGO_HOST;
    process.env.MONGO_USERNAME = 'user';
    process.env.MONGO_PASSWORD = 'fake-pass'; //NOSONAR

    await expect(import('~/config/index')).rejects.toThrow(envErrors.MONGO_HOST.REQUIRED);
  });

  it('throws Zod errors if credentials are missing for remote mongo', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'remotehost';
    delete process.env.MONGO_USERNAME;
    delete process.env.MONGO_PASSWORD; //NOSONAR

    await expect(import('~/config/index')).rejects.toThrow(envErrors.MONGO_USERNAME.REQUIRED);
    await expect(import('~/config/index')).rejects.toThrow(envErrors.MONGO_PASSWORD.REQUIRED);
  });

  it('throws Zod error if MONGO_PORT is invalid', async () => {
    process.env.MONGO_DB = 'testdb';
    process.env.MONGO_HOST = 'localhost';
    process.env.MONGO_PORT = 'not-a-number';
    process.env.MONGO_USERNAME = 'user';
    process.env.MONGO_PASSWORD = 'fake-pass'; //NOSONAR

    await expect(import('~/config/index')).rejects.toThrow(envErrors.MONGO_PORT_INVALID);
  });
});
