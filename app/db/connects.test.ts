const mockConnection = { connection: { readyState: 1 } };

const mockMongoose = (connectImpl = jest.fn()) => {
  jest.doMock('mongoose', () => ({
    connect: connectImpl,
  }));
};

const mockConfig = (url: string | undefined) => {
  jest.doMock('../config', () => ({
    mongoUrl: url,
  }));
};

const mockLoggerModule = (loggerMock: any) => {
  jest.doMock('../middleware/logger/logger', () => loggerMock);
};

const createLoggerMock = () => ({
  info: jest.fn(),
  error: jest.fn(),
});

describe('dbConnect', () => {
  beforeEach(() => {
    jest.resetModules();
    (global as any).mongoose = undefined;
    jest.clearAllMocks();
  });

  it('should connect and cache the connection', async () => {
    const connectMock = jest.fn().mockResolvedValue(mockConnection);
    const loggerMock = createLoggerMock();

    mockMongoose(connectMock);
    mockConfig('mongodb://localhost:27017/test-db');
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/db/connect');
    const { connect } = await import('mongoose');
    const { mongoUrl } = await import('~/config');

    const conn = await dbConnect();

    expect(connect).toHaveBeenCalledWith(mongoUrl, { bufferCommands: false });
    expect(loggerMock.info).toHaveBeenCalledWith('✅ Connected to db');
    expect(conn).toStrictEqual(mockConnection);

    const cached = (global as any).mongoose;
    expect(cached).toBeDefined();
    expect(cached.conn).toStrictEqual(mockConnection);
    expect(cached.promise).toBeInstanceOf(Promise);
  });

  it('should log error if connection fails', async () => {
    const error = new Error('Connection failed');
    const loggerMock = createLoggerMock();

    mockMongoose(jest.fn().mockRejectedValue(error));
    mockConfig('mongodb://localhost:27017/test-db');
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/db/connect');

    await expect(dbConnect()).rejects.toThrow('Connection failed');

    expect(loggerMock.error).toHaveBeenCalledWith(
      '❌ Failed to connect to the database:',
      error,
    );
  });

  it('should return cached connection if exists', async () => {
    const cachedConn = { connection: { readyState: 1 } };
    (global as any).mongoose = {
      conn: cachedConn,
      promise: Promise.resolve(cachedConn),
    };

    const loggerMock = createLoggerMock();
    mockMongoose(jest.fn());
    mockConfig('mongodb://localhost:27017/test-db');
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/db/connect');
    const { connect } = await import('mongoose');

    const conn = await dbConnect();

    expect(connect as jest.Mock).not.toHaveBeenCalled();
    expect(conn).toStrictEqual(cachedConn);
  });

  it('should throw if mongoUrl is not defined', async () => {
    const loggerMock = createLoggerMock();
    mockMongoose(jest.fn());
    mockConfig(undefined);
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/db/connect');

    await expect(dbConnect()).rejects.toThrow(
      'Failed to construct mongoUrl. Please ensure that required environment variables (MONGO_DB, MONGO_HOST, and optionally MONGO_USERNAME and MONGO_PASSWORD) are defined.',
    );
  });

  it('should reset promise if connection fails', async () => {
    const error = new Error('Connection failed');
    const loggerMock = createLoggerMock();

    mockMongoose(jest.fn().mockRejectedValue(error));
    mockConfig('mongodb://localhost:27017/test-db');
    mockLoggerModule(loggerMock);

    const { default: dbConnect } = await import('~/db/connect');

    await expect(dbConnect()).rejects.toThrow('Connection failed');
    expect((global as any).mongoose.promise).toBeNull();
  });
});
