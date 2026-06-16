import { getEventTimestamp, mapEventToCardProps, type RawEventItem, sortEvents } from './events';

describe('events utils', () => {
  describe('getEventTimestamp', () => {
    it('should return timestamp of endDate if it is provided', () => {
      const startDate = '2026-06-10T10:00:00Z';
      const endDate = '2026-06-11T10:00:00Z';
      const expected = new Date(endDate).getTime();

      expect(getEventTimestamp(endDate, startDate)).toBe(expected);
    });

    it('should return timestamp of startDate if endDate is not provided', () => {
      const startDate = '2026-06-10T10:00:00Z';
      const expected = new Date(startDate).getTime();

      expect(getEventTimestamp(null, startDate)).toBe(expected);
      expect(getEventTimestamp(undefined, startDate)).toBe(expected);
    });

    it('should return 0 if both dates are not provided', () => {
      expect(getEventTimestamp(null, null)).toBe(0);
      expect(getEventTimestamp()).toBe(0);
    });
  });

  describe('sortEvents', () => {
    const FIXED_TIME = new Date('2026-06-14T12:00:00Z').getTime();

    it('should sort upcoming events first (closest to furthest) and completed events last (newest to oldest)', () => {
      const futureClose = { _id: 'future-close', eventDateTimeStart: '2026-06-15T10:00:00Z' } as RawEventItem;
      const futureFar = { _id: 'future-far', eventDateTimeStart: '2026-06-20T10:00:00Z' } as RawEventItem;
      const pastRecent = { _id: 'past-recent', eventDateTimeStart: '2026-06-10T10:00:00Z' } as RawEventItem;
      const pastOld = { _id: 'past-old', eventDateTimeStart: '2026-01-01T10:00:00Z' } as RawEventItem;

      const unsortedEvents = [pastOld, futureFar, pastRecent, futureClose];
      const sorted = sortEvents(unsortedEvents, FIXED_TIME);

      expect(sorted[0]._id).toBe('future-close');
      expect(sorted[1]._id).toBe('future-far');
      expect(sorted[2]._id).toBe('past-recent');
      expect(sorted[3]._id).toBe('past-old');
    });

    it('should sort correctly when array contains only upcoming events', () => {
      const eventA = { _id: 'A', eventDateTimeStart: '2026-06-15T10:00:00Z' } as RawEventItem;
      const eventB = { _id: 'B', eventDateTimeStart: '2026-06-16T10:00:00Z' } as RawEventItem;

      const sorted = sortEvents([eventB, eventA], FIXED_TIME);

      expect(sorted[0]._id).toBe('A');
      expect(sorted[1]._id).toBe('B');
    });

    it('should sort correctly when array contains only completed events', () => {
      const eventA = { _id: 'A', eventDateTimeStart: '2026-06-10T10:00:00Z' } as RawEventItem;
      const eventB = { _id: 'B', eventDateTimeStart: '2026-05-10T10:00:00Z' } as RawEventItem;

      const sorted = sortEvents([eventB, eventA], FIXED_TIME);

      expect(sorted[0]._id).toBe('A');
      expect(sorted[1]._id).toBe('B');
    });
  });

  describe('mapEventToCardProps', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-06-14T12:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    const mockBaseEvent = {
      _id: '123',
      title: 'Test Event',
      description: 'Description of test event',
      slug: 'test-event',
      coverImage: {
        src: '/test-img.jpg',
        alt: 'Test Alt',
        crop: null
      },
      publishedAt: '2026-01-01T10:00:00Z',
      eventDateTimeStart: '2026-06-20T10:00:00Z',
      eventDateTimeEnd: null,
      ticketUrl: { uk: 'https://ticket.uk', en: 'https://ticket.en' }
    } as unknown as RawEventItem;

    it('should map a future event correctly and include the localized registration link', () => {
      const props = mapEventToCardProps(mockBaseEvent, 'uk', 'Завершена подія', 'Переглянути', 'Реєстрація', 'text');

      expect(props.title).toBe('Test Event');
      expect(props.description).toBe('Description of test event');
      expect(props.href).toBe('/events/test-event');
      expect(props.image.src).toBe('/test-img.jpg');
      expect(props.dateVariant).toBe('text');
      expect(props.statusLabel).toBeUndefined();

      expect(props.actions).toHaveLength(2);
      expect(props.actions?.[0]).toEqual({ label: 'Переглянути', href: '/events/test-event' });
      expect(props.actions?.[1]).toEqual({ label: 'Реєстрація', href: 'https://ticket.uk' });
    });

    it('should mark past event as completed and hide registration link', () => {
      const pastEvent = {
        ...mockBaseEvent,
        eventDateTimeStart: '2026-06-10T10:00:00Z'
      } as unknown as RawEventItem;

      const props = mapEventToCardProps(pastEvent, 'uk', 'Завершена подія', 'Переглянути', 'Реєстрація');

      expect(props.statusLabel).toBe('Завершена подія');
      expect(props.actions).toHaveLength(1);
      expect(props.actions?.[0].label).toBe('Переглянути');
    });

    it('should handle ticketUrl as a simple string instead of localized object', () => {
      const stringTicketEvent = {
        ...mockBaseEvent,
        ticketUrl: 'https://single-ticket.com'
      } as unknown as RawEventItem;

      const props = mapEventToCardProps(stringTicketEvent, 'uk', 'Завершена подія', 'Переглянути', 'Реєстрація');

      expect(props.actions?.[1]).toEqual({ label: 'Реєстрація', href: 'https://single-ticket.com' });
    });

    it('should use fallback values for missing images and dates', () => {
      const minimalEvent = {
        _id: '456',
        title: 'Minimal Event',
        description: '',
        slug: 'minimal',
        eventDateTimeStart: null,
        eventDateTimeEnd: null,
        publishedAt: null,
        coverImage: null
      } as unknown as RawEventItem;

      const props = mapEventToCardProps(minimalEvent, 'uk', 'Завершена подія', 'Переглянути', 'Реєстрація');

      expect(props.image.src).toBe('/images/placeholder.png');
      expect(props.image.alt).toBe('Зображення події');
      expect(props.date?.startDate).toBe('');
      expect(props.publishedAt).toBe('');
      expect(props.dateVariant).toBe('numeric');
    });
  });
});
