import { Locale } from 'next-intl';

import type { EventsRepository } from '~/infrastructure/repositories/events/events.repo';
import { ArraySchema } from '~/validators/constants';
import { eventListItemSchema, eventSchema } from '~/validators/events.schema';
import { LocalizeSchema } from '~/validators/localization';

interface EventsServiceDeps {
  eventsRepository: EventsRepository;
}

export const createEventsService = ({ eventsRepository }: EventsServiceDeps) => ({
  async getAllPublishedEvents(locale: Locale) {
    try {
      const events = await eventsRepository.getAllPublishedEvents();

      if (!events || events.length === 0) {
        return [];
      }

      return ArraySchema(LocalizeSchema(eventListItemSchema, locale)).parse(events);
    } catch {
      return [];
    }
  },

  async getEventBySlug(slug: string, locale: Locale) {
    const event = await eventsRepository.getEventBySlug(slug);
    if (!event) return null;

    return LocalizeSchema(eventSchema, locale).parse(event);
  }
});

export type EventsService = ReturnType<typeof createEventsService>;
