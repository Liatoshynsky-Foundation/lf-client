import mongoose from "mongoose";
import { mongoUrl } from "~/config";
import logger from "~/middleware/logger";

type MongooseGlobalCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseGlobalCache | undefined;
}

let cached: MongooseGlobalCache = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

async function dbConnect() {

  if (!mongoUrl) {
    throw new Error(
      "Please define the mongoUrl environment variable inside config",
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
    // logger.error(error);
    throw error;
  }

  return cached.conn;
}

export default dbConnect;