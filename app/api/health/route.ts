import mongoose from 'mongoose';

import { errors } from '~/constants/errors';
import { errorResponse, successResponse } from '~/utils/apiResponse';

import dbConnect from '~/db/connect';

const MONGODB_READY_STATES: { [key: number]: string } = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
  99: 'uninitialized'
};

export async function GET() {
  try {
    await dbConnect();
    const state = mongoose.connection.readyState;
    const statusText = MONGODB_READY_STATES[state] || 'unknown';

    if (state === 1) {
      return successResponse({ status: 'ok', db: statusText }, 200);
    } else {
      return errorResponse([errors.FAILED_TO_CONNECT_DB], 503);
    }
  } catch {
    return errorResponse([errors.UNKNOWN_ERROR_DURING_DB_CONNECTION], 500);
  }
}
