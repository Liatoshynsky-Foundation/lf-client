jest.mock('bson', () => ({}), { virtual: true });
jest.mock(
  'mongoose',
  () => ({
    connect: jest.fn(),
    connection: { readyState: 1 }
  }),
  { virtual: true }
);
import type { Mongoose } from 'mongoose';

import { errors } from '~/constants/errors';

type MongooseGlobalCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

const mockConnection = { connection: { readyState: 1 } };

const mockMongoose = (connectImpl = jest.fn()) => {
  jest.doMock('mongoose', () => ({
    connect: connectImpl
  }));
};

const mockConfig = (url: string | undefined) => {
  jest.doMock(require.resolve('~/config'), () => ({
    mongoUrl: url
  }));
};

const mockLoggerModule = (loggerMock: { info: jest.Mock; error: jest.Mock }) => {
  jest.doMock(require.resolve('~/middleware/logger/logger'), () => loggerMock);
};

const createLoggerMock = () => ({
  info: jest.fn(),
  error: jest.fn()
});

describe('dbConnect', () => {
  beforeEach(() => {
    jest.resetModules();
    (global as { mongoose?: MongooseGlobalCache }).mongoose = undefined;
    jest.clearAllMocks();
  });
  it('should return cached connection if it already exists', async () => {
    const loggerMock = createLoggerMock();
    const existingConnection = { connection: { readyState: 1 } };

    (global as any).mongoose = {
      conn: existingConnection,
      promise: Promise.resolve(existingConnection)
    };

    mockConfig('mongodb://localhost:27017/test-db');
    mockLoggerModule(loggerMock);

    const dbConnectModule = await import('~/infrastructure/db/connect');
    const dbConnect = dbConnectModule.default;

    const conn = await dbConnect();

    expect(conn).toStrictEqual(existingConnection);
  });
  it('should connect and cache the connection', async () => {
    const connectMock = jest.fn().mockResolvedValue(mockConnection);
    const loggerMock = createLoggerMock();

    mockMongoose(connectMock);
    mockConfig('mongodb://localhost:27017/test-db');
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/infrastructure/db/connect');
    const { connect } = await import('mongoose');
    const { mongoUrl } = await import('~/config');

    const conn = await dbConnect();

    expect(connect).toHaveBeenCalledWith(mongoUrl, { bufferCommands: false });
    expect(loggerMock.info).toHaveBeenCalledWith('✅ Connected to db');
    expect(conn).toStrictEqual(mockConnection);

    const cached = (global as { mongoose?: MongooseGlobalCache }).mongoose;
    expect(cached).toBeDefined();
    expect(cached?.conn).toStrictEqual(mockConnection);
    expect(cached?.promise).toBeInstanceOf(Promise);
  });

  it('should log error if connection fails', async () => {
    const error = new Error('Connection failed');
    const loggerMock = createLoggerMock();

    mockMongoose(jest.fn().mockRejectedValue(error));
    mockConfig('mongodb://localhost:27017/test-db');
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/infrastructure/db/connect');

    await expect(dbConnect()).rejects.toThrow('Connection failed');

    expect(loggerMock.error).toHaveBeenCalledWith(errors.FAILED_TO_CONNECT_DB, error);
  });

  it('should connect and cache the connection (mockImplementation)', async () => {
    const loggerMock = createLoggerMock();

    const fakeMongoose = {
      connection: { readyState: 1 }
    } as Partial<Mongoose>;

    const connectMock = jest.fn().mockResolvedValue(fakeMongoose);

    jest.doMock('mongoose', () => ({
      connect: connectMock
    }));

    mockConfig('mongodb://localhost:27017/test-db');
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/infrastructure/db/connect');
    const { connect } = await import('mongoose');
    const { mongoUrl } = await import('~/config');

    const conn = await dbConnect();

    expect(connect).toHaveBeenCalledWith(mongoUrl, { bufferCommands: false });
    expect(loggerMock.info).toHaveBeenCalledWith('✅ Connected to db');
    expect(conn).toStrictEqual(fakeMongoose);

    const cached = (global as typeof globalThis & { mongoose: MongooseGlobalCache }).mongoose;
    expect(cached).toBeDefined();
    expect(cached.conn).toStrictEqual(fakeMongoose);
    expect(cached.promise).toBeInstanceOf(Promise);
  });

  it('should throw if mongoUrl is not defined', async () => {
    const loggerMock = createLoggerMock();
    mockMongoose(jest.fn());
    mockConfig(undefined);
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/infrastructure/db/connect');

    await expect(dbConnect()).rejects.toThrow(errors.MISSING_MONGO_URL);
  });

  it('should reset promise if connection fails', async () => {
    const error = new Error('Connection failed');
    const loggerMock = createLoggerMock();

    mockMongoose(jest.fn().mockRejectedValue(error));
    mockConfig('mongodb://localhost:27017/test-db');
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/infrastructure/db/connect');

    await expect(dbConnect()).rejects.toThrow('Connection failed');
    const cached = (global as typeof globalThis & { mongoose: MongooseGlobalCache }).mongoose;
    expect(cached.promise).toBeNull();
  });
});
