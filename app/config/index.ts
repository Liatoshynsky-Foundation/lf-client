const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_HOST = process.env.MONGO_HOST ?? 'localhost';
const MONGO_PORT = process.env.MONGO_PORT ?? '27017';

export const mongoUrl =
  MONGO_HOST === 'localhost'
    ? `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
    : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;
