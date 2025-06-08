import type { TransformableInfo } from 'logform';
import { createLogger, format, transports } from 'winston';
import { MongoDB } from 'winston-mongodb';

import { mongoUrl } from '~/config';
import { SEVEN_DAYS_IN_SECONDS } from '~/constants';

const { combine, timestamp, printf, errors, json } = format;

const formatStack = (stack: unknown): string => {
  if (typeof stack === 'string') {
    return `\n📌 Stack trace:\n${stack
      .split('\n')
      .map((line) => '  ' + line.trim())
      .join('\n')}`;
  }
  return '';
};

const logFormat = printf((info: TransformableInfo): string => {
  const { level, message, timestamp, stack, ...rest } = info;
  const meta = Object.keys(rest).length > 0 ? JSON.stringify(rest, null, 2) : '';
  const metaBlock = meta ? '\n' + meta : '';
  return `🕒 ${timestamp} ${level}: ${message}${metaBlock}${formatStack(stack)}`;
});

const logger = createLogger({
  format: combine(errors({ stack: true }), timestamp(), logFormat),
  transports: [
    new transports.Console({
      format: combine(format.colorize(), logFormat),
      handleExceptions: true
    }),

    new MongoDB({
      level: 'error',
      db: mongoUrl,
      collection: 'logger',
      expireAfterSeconds: SEVEN_DAYS_IN_SECONDS,
      format: combine(errors({ stack: true }), timestamp(), json())
    })
  ]
});

export default logger;
