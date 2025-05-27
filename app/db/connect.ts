import mongoose from 'mongoose';
import { mongoUrl } from '~/config';
import logger from '~/middleware/logger/logger';
import { errors } from '~/constants/errors';

type MongooseGlobalCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

let cached: MongooseGlobalCache = (global as { mongoose?: MongooseGlobalCache })
  .mongoose ?? {
  conn: null,
  promise: null,
};
(global as { mongoose?: MongooseGlobalCache }).mongoose = cached;

async function dbConnect() {
  if (!mongoUrl) {
    throw new Error(errors.MISSING_MONGO_URL);
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
    logger.error(errors.FAILED_TO_CONNECT_DB, error);
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
