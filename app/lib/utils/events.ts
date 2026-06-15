import { z } from 'zod';

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
