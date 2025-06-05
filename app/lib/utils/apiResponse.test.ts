import { NextResponse } from 'next/server';

import { errorResponse, successResponse } from '~/utils/apiResponse';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn()
  }
}));

describe('apiResponse utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a success response with status 200 by default', () => {
    const data = { message: 'OK' };
    successResponse(data);

    expect(NextResponse.json).toHaveBeenCalledWith(data, { status: 200 });
  });

  it('should return a success response with custom status', () => {
    const data = { message: 'Created' };
    successResponse(data, 201);

    expect(NextResponse.json).toHaveBeenCalledWith(data, { status: 201 });
  });

  it('should return an error response with default status 400', () => {
    const errors = ['Invalid input'];
    errorResponse(errors);

    expect(NextResponse.json).toHaveBeenCalledWith({ success: false, errors }, { status: 400 });
  });

  it('should return an error response with custom status', () => {
    const errors = { field: 'Required' };
    errorResponse(errors, 422);

    expect(NextResponse.json).toHaveBeenCalledWith({ success: false, errors }, { status: 422 });
  });
});
