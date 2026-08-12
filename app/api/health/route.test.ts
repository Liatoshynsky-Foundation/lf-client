import * as util from 'util';

if (typeof global.TextEncoder === 'undefined') {
  Object.defineProperty(global, 'TextEncoder', { value: util.TextEncoder, writable: true });
  Object.defineProperty(global, 'TextDecoder', { value: util.TextDecoder, writable: true });
}

import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { errors } from '~/constants/errors';

jest.mock('~/infrastructure/db/connect', () => jest.fn());
jest.mock('~/utils/apiResponse', () => ({
  successResponse: jest.fn((data: unknown) => ({ _testData: data, status: 200 }))
}));

const mockMongooseConnection = {
  readyState: 0,
  db: null as unknown,
  host: 'localhost',
  port: 27017,
  name: 'test-db'
};

jest.mock('mongoose', () => ({
  connection: mockMongooseConnection
}));

type MockResponse = {
  status: number;
  _testData: {
    status?: string;
    dependencies: {
      database: {
        message: string;
        details: {
          connectionStatus?: string;
        };
      };
    };
  };
};

type MockRouteHandler = () => Promise<MockResponse>;

describe('Health API Route', () => {
  let GET: MockRouteHandler;

  if (typeof global.Request === 'undefined') {
    Object.defineProperty(global, 'Request', { value: class {}, writable: true });
    Object.defineProperty(global, 'Response', { value: class {}, writable: true });
  }

  beforeAll(async () => {
    const nextServer = await import('next/server');

    type MockJsonFn = (data: unknown, init?: { status?: number }) => unknown;

    (nextServer.NextResponse.json as unknown as MockJsonFn) = jest.fn((data: unknown, init?: { status?: number }) => ({
      json: async () => data,
      status: init?.status || 200,
      _testData: data
    })) as unknown as MockJsonFn;

    const routeModule = await import('./route');
    GET = routeModule.GET as unknown as MockRouteHandler;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockMongooseConnection.readyState = 0;
    mockMongooseConnection.db = null;
  });

  it('should return UP when database is connected', async () => {
    const mockCommandFn: jest.Mock<() => Promise<unknown>> = jest.fn();
    mockCommandFn.mockResolvedValue({ collections: 5, objects: 100 });

    const mockServerStatusFn: jest.Mock<() => Promise<unknown>> = jest.fn();
    mockServerStatusFn.mockResolvedValue({ version: '6.0.0', uptime: 3600 });

    const mockDb = {
      command: mockCommandFn,
      admin: () => ({
        serverStatus: mockServerStatusFn
      })
    };

    mockMongooseConnection.readyState = 1;
    mockMongooseConnection.db = mockDb;

    const res = await GET();
    expect(res.status).toBe(200);
    expect(res._testData.status).toBe('UP');
  });

  it('should return 503 if state is NOT 1', async () => {
    mockMongooseConnection.readyState = 2;
    const res = await GET();
    expect(res.status).toBe(503);
    expect(res._testData.dependencies.database.details.connectionStatus).toBe('CONNECTING');
  });

  it('should return 503 if isConnected but db object is missing', async () => {
    mockMongooseConnection.readyState = 1;
    mockMongooseConnection.db = null;

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await GET();

    expect(res.status).toBe(503);
    expect(res._testData.dependencies.database.message).toBe(errors.FAILED_TO_CONNECT_DB);

    consoleErrorSpy.mockRestore();
  });

  it('should cover UNKNOWN branch in getMongooseConnectionState (Line 11)', async () => {
    mockMongooseConnection.readyState = 999;

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await GET();

    expect(res.status).toBe(503);
    expect(res._testData.dependencies.database.details.connectionStatus).toBe('UNKNOWN');

    consoleErrorSpy.mockRestore();
  });

  it('should handle exception in catch block (DB Connection Error)', async () => {
    const mockConsole = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await GET();
    expect(res.status).toBe(503);
    expect(res._testData.dependencies.database.message).toBeDefined();

    mockConsole.mockRestore();
  });
});
