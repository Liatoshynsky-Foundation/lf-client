import * as util from 'util';

import { errors } from '~/constants/errors';
jest.mock('~/infrastructure/db/connect', () => jest.fn());
jest.mock('~/utils/apiResponse', () => ({
  successResponse: jest.fn((data) => ({ _testData: data, status: 200 }))
}));
jest.mock('mongoose', () => ({
  connection: {
    readyState: 0,
    db: null,
    host: 'localhost',
    port: 27017,
    name: 'test-db'
  }
}));
import mongoose from 'mongoose';

import dbConnect from '~/infrastructure/db/connect';
describe('Health API Route', () => {
  let GET: any;
  if (typeof global.Request === 'undefined') {
    (global as any).Request = class {
      constructor() {}
    } as any;
    (global as any).Response = class {
      constructor() {}
    } as any;
    (global as any).TextEncoder = util.TextEncoder;
    (global as any).TextDecoder = util.TextDecoder;
  }
  beforeAll(async () => {
    const nextServer = await import('next/server');
    nextServer.NextResponse.json = jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status || 200,
      _testData: data
    })) as any;

    const routeModule = await import('./route');
    GET = routeModule.GET;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (mongoose.connection as any).readyState = 0;
    (mongoose.connection as any).db = null;
  });

  it('should return UP when database is connected', async () => {
    const mockDb = {
      command: jest.fn().mockResolvedValue({ collections: 5, objects: 100 }),
      admin: () => ({
        serverStatus: jest.fn().mockResolvedValue({ version: '6.0.0', uptime: 3600 })
      })
    };

    (mongoose.connection as any).readyState = 1;
    (mongoose.connection as any).db = mockDb;

    const res = await GET();
    expect(res.status).toBe(200);
    expect(res._testData.status).toBe('UP');
  });

  it('should return 503 if state is NOT 1', async () => {
    (mongoose.connection as any).readyState = 2;
    const res = await GET();
    expect(res.status).toBe(503);
    expect(res._testData.dependencies.database.details.connectionStatus).toBe('CONNECTING');
  });

  it('should return 503 if isConnected but db object is missing', async () => {
    (mongoose.connection as any).readyState = 1;
    (mongoose.connection as any).db = null;

    const res = await GET();

    expect(res.status).toBe(503);
    expect(res._testData.dependencies.database.message).toBe(errors.FAILED_TO_CONNECT_DB);
  });
  it('should cover UNKNOWN branch in getMongooseConnectionState (Line 11)', async () => {
    (mongoose.connection as any).readyState = 999;

    const res = await GET();

    expect(res.status).toBe(503);
    expect(res._testData.dependencies.database.details.connectionStatus).toBe('UNKNOWN');
  });
  it('should handle exception in catch block (DB Connection Error)', async () => {
    const mockedDbConnect = jest.mocked(dbConnect);
    mockedDbConnect.mockRejectedValueOnce(new Error('Fatal DB Fail'));

    const res = await GET();
    expect(res.status).toBe(503);
    expect(res._testData.dependencies.database.message).toBeDefined();
  });
});
