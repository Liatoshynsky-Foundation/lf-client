import { z } from 'zod';

import { type EventItemProps } from '~/shared/components/blocks/event-card/EventItem';
import { eventListItemSchema } from '~/validators/events.schema';
import { Localize } from '~/validators/localization';

export type RawEventItem = Localize<z.infer<typeof eventListItemSchema>>;

export const getEventTimestamp = (endDate?: string | null, startDate?: string | null) => {
  if (endDate) return new Date(endDate).getTime();
  if (startDate) return new Date(startDate).getTime();
  return 0;
};

export const sortEvents = (events: RawEventItem[]) => {
  const nowTime = Date.now();

  const upcomingEvents = events
    .filter((e) => getEventTimestamp(e.eventDateTimeEnd, e.eventDateTimeStart) >= nowTime)
    .sort((a, b) => new Date(a.eventDateTimeStart || 0).getTime() - new Date(b.eventDateTimeStart || 0).getTime());

  const completedEvents = events
    .filter((e) => getEventTimestamp(e.eventDateTimeEnd, e.eventDateTimeStart) < nowTime)
    .sort((a, b) => {
      const dateA = getEventTimestamp(a.eventDateTimeEnd, a.eventDateTimeStart);
      const dateB = getEventTimestamp(b.eventDateTimeEnd, b.eventDateTimeStart);
      return dateB - dateA;
    });

  return [...upcomingEvents, ...completedEvents];
};

export const mapEventToCardProps = (
  event: RawEventItem,
  locale: string,
  completedLabel: string,
  viewLabel: string,
  regLabel: string,
  dateVariant: 'numeric' | 'text' = 'numeric'
): EventItemProps => {
  const isCompleted = getEventTimestamp(event.eventDateTimeEnd, event.eventDateTimeStart) < Date.now();

  const cardActions = [{ label: viewLabel, href: `/events/${event.slug}` }];

  if (!isCompleted && event.ticketUrl) {
    const regLink = typeof event.ticketUrl === 'string' ? event.ticketUrl : event.ticketUrl[locale];
    if (regLink) {
      cardActions.push({ label: regLabel, href: regLink });
    }
  }

  return {
    title: event.title,
    description: event.description,
    image: {
      src: event.coverImage?.src || '/images/placeholder.png',
      alt: event.coverImage?.alt || 'Зображення події',
      crop: event.coverImage?.crop
    },
    href: `/events/${event.slug}`,
    date: {
      startDate: event.eventDateTimeStart ? new Date(event.eventDateTimeStart).toISOString() : '',
      endDate: event.eventDateTimeEnd ? new Date(event.eventDateTimeEnd).toISOString() : undefined
    },
    dateVariant,
    statusLabel: isCompleted ? completedLabel : undefined,
    publishedAt: event.publishedAt ? new Date(event.publishedAt).toISOString() : '',
    actions: cardActions
  };
};
