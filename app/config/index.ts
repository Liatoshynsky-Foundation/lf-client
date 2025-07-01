export const getMongoUrl = (): string => {
  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB, MONGO_HOST, MONGO_PORT } = process.env;

  if (MONGO_HOST === 'localhost') {
    return `mongodb://${MONGO_HOST}:${MONGO_PORT ?? 27017}/${MONGO_DB}`;
  }

  return `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;
};

export const mongoUrl = getMongoUrl();
