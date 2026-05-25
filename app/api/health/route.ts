import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

import { errors } from '~/constants/errors';
import { successResponse } from '~/utils/apiResponse';

import { stateNames } from '~/constants';
import dbConnect from '~/infrastructure/db/connect';

const getMongooseConnectionState = (state: number): string => {
  return stateNames[state] || 'UNKNOWN';
};

export async function GET() {
  const healthDetails = {
    status: 'DOWN',
    timestamp: new Date().toISOString(),
    dependencies: {
      database: {
        name: 'MongoDB (Mongoose)',
        status: 'DOWN',
        message: 'Health check not performed yet.',
        details: {}
      }
    }
  };

  try {
    await dbConnect();
    const connection = mongoose.connection;
    const db = connection.db;
    const readyState = connection.readyState;
    const connectionStatus = getMongooseConnectionState(readyState);
    const isConnected = readyState === 1;

    healthDetails.dependencies.database.details = {
      connectionStatus: connectionStatus,
      host: connection.host,
      port: connection.port,
      databaseName: connection.name
    };

    if (isConnected) {
      if (!db) throw new Error(errors.FAILED_TO_CONNECT_DB);
      const stats = await db.command({ dbStats: 1 });
      const serverInfo = await db.admin().serverStatus();

      healthDetails.dependencies.database.details = {
        ...healthDetails.dependencies.database.details,
        serverVersion: serverInfo.version,
        collections: stats.collections,
        objects: stats.objects,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        uptime: serverInfo.uptime
      };

      healthDetails.status = 'UP';
      healthDetails.dependencies.database.status = 'UP';
      healthDetails.dependencies.database.message = '✅ Database is connected and healthy';

      return successResponse(healthDetails);
    } else {
      healthDetails.dependencies.database.message = `Database connection state is: ${connectionStatus}`;
      return NextResponse.json(healthDetails, { status: 503 });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[HealthCheck:GET] Database health check failed:', e);

    healthDetails.dependencies.database.message = errors.FAILED_TO_CONNECT_DB;
    healthDetails.dependencies.database.details = { e };
    return NextResponse.json(healthDetails, { status: 503 });
  }
}
