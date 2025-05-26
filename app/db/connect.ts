import mongoose from 'mongoose';
import { mongoUrl } from '~/config';
import logger from '~/middleware/logger/logger';

type MongooseGlobalCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseGlobalCache | undefined;
}

let cached: MongooseGlobalCache = global.mongoose ?? {
  conn: null,
  promise: null,
};
global.mongoose = cached;

async function dbConnect() {
  if (!mongoUrl) {
    throw new Error(
      'Failed to construct mongoUrl. Please ensure that required environment variables (MONGO_DB, MONGO_HOST, and optionally MONGO_USERNAME and MONGO_PASSWORD) are defined.',
    );
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(mongoUrl, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
    logger.info('✅ Connected to db');
  } catch (error) {
    cached.promise = null;
    logger.error('❌ Failed to connect to the database:', error);
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
