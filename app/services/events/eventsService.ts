import { Locale } from 'next-intl';

import eventsRepositoryObj from '~/infrastructure/repositories/events/events.repository';
import logger from '~/middleware/logger/logger';
import { ArraySchema } from '~/validators/constants';
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

      return ArraySchema(LocalizeSchema(eventListItemSchema, locale)).parse(events);
    } catch (error) {
      logger.error('Failed to get published events', { error });
      return [];
    }
  },

  async getEventBySlug(slug: string, locale: Locale) {
    try {
      const event = await eventsRepository.getEventBySlug(slug);
      if (!event) return null;

      return LocalizeSchema(eventSchema, locale).parse(event);
    } catch (error) {
      logger.error('Failed to get or parse event by slug (${slug}):', { error });
      return null;
    }
  }
});

export type EventsService = ReturnType<typeof createEventsService>;
