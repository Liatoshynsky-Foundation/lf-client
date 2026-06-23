import { Locale } from 'next-intl';

import { errors } from '~/constants/errors';

import type { EventRepository } from '~/infrastructure/repositories/events/event.repo';
import { parseArraySafely } from '~/lib/utils/parseArraySafely';
import logger from '~/middleware/logger/logger';
import { eventListItemSchema, eventSchema } from '~/validators/event.schema';
import { LocalizeSchema } from '~/validators/localization';

interface EventServiceDeps {
  eventRepository: EventRepository;
}

export const createEventService = ({ eventRepository }: EventServiceDeps) => ({
  async getAllPublishedEvents(locale: Locale) {
    try {
      const events = await eventRepository.getAllPublishedEvents();

      if (!events || events.length === 0) {
        return [];
      }

      const { validItems, invalidCount } = parseArraySafely(events, LocalizeSchema(eventListItemSchema, locale));

      if (invalidCount > 0) {
        logger.warn(`[SERVICE:Events:getAllPublishedEvents] Skipped ${invalidCount} invalid event records`);
      }

      return validItems;
    } catch (error) {
      logger.error(errors.EVENTS_FETCH_FAILED, error);
      return [];
    }
  },

  async getEventBySlug(slug: string, locale: Locale) {
    try {
      const event = await eventRepository.getEventBySlug(slug);
      if (!event) return null;

      const { ticketUrl, ...eventRest } = event;
      const localizedEvent = LocalizeSchema(eventSchema.omit({ ticketUrl: true }), locale).parse(eventRest);
      const localizedTicketUrl = ticketUrl ? (ticketUrl[locale] ?? null) : null;

      return { ...localizedEvent, ticketUrl: localizedTicketUrl };
    } catch (error) {
      logger.error(errors.EVENT_FETCH_BY_SLUG_FAILED, error);
      return null;
    }
  }
});

export type EventService = ReturnType<typeof createEventService>;
