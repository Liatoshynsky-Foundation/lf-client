import { Locale } from 'next-intl';

import { loggerErrors } from '~/constants/errors';

import eventsRepositoryObj from '~/infrastructure/repositories/events/events.repository';
import { parseArraySafely } from '~/lib/utils/parseArraySafely';
import logger from '~/middleware/logger/logger';
import { eventListItemSchema, eventSchema } from '~/validators/events.schema';
import { LocalizeSchema } from '~/validators/localization';

interface EventsServiceDeps {
  eventsRepository: typeof eventsRepositoryObj;
}

export const createEventsService = ({ eventsRepository }: EventsServiceDeps) => ({
  async getAllPublishedEvents(locale: Locale) {
    try {
      const events = await eventsRepository.getAllPublishedEvents();

      if (events.length === 0) {
        return [];
      }

      const { validItems, invalidCount } = parseArraySafely(events, LocalizeSchema(eventListItemSchema, locale));

      if (invalidCount > 0) {
        logger.warn(`[SERVICE:Events:getAllPublishedEvents] Skipped ${invalidCount} invalid event records`);
      }

      return validItems;
    } catch (error) {
      logger.error(
        `[SERVICE:Events:getAllPublishedEvents] Failed to fetch or parse events. ${loggerErrors.ZOD_VALIDATION_ERROR}`,
        error
      );
      return [];
    }
  },

  async getEventBySlug(slug: string, locale: Locale) {
    try {
      const event = await eventsRepository.getEventBySlug(slug);
      if (!event) return null;

      return LocalizeSchema(eventSchema, locale).parse(event);
    } catch (error) {
      logger.error(
        `[SERVICE:Events:getEventBySlug] Failed to fetch or parse event by slug: ${slug}. ${loggerErrors.ZOD_VALIDATION_ERROR}`,
        error
      );
      return null;
    }
  }
});

export type EventsService = ReturnType<typeof createEventsService>;
