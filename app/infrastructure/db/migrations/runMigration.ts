import 'dotenv/config';
import mongoose from 'mongoose';
import path from 'path';

import { mongoUrl } from '~/config';
import logger from '~/middleware/logger/logger';

async function run() {
  const args = process.argv.slice(2);
  const [migrationPath, direction] = args;

  if (!migrationPath || !direction || !['up', 'down'].includes(direction)) {
    logger.error('❌ Usage: npx tsx <path_to_runner> <path_to_migration> <up|down>');
    process.exit(1);
  }
  try {
    await mongoose.connect(mongoUrl);

    const absoluteMigrationPath = path.resolve(process.cwd(), migrationPath);

    const migrationModule = await import(absoluteMigrationPath);

    if (typeof migrationModule[direction] !== 'function') {
      throw new Error(`Function "${direction}" not found in migration module.`);
    }
    await migrationModule[direction]();
    logger.info(`✅ Migration ${direction} executed successfully from ${absoluteMigrationPath}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
}

run();
