jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({
      status: init?.status ?? 200,
      json: jest.fn().mockResolvedValue(body)
    }))
  }
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn()
}));

jest.mock('~/middleware/logger/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn()
  }
}));
