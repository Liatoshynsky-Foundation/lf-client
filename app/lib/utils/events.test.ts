import { getEventTimestamp, type RawEventItem, sortEvents } from './events';

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
      expect(getEventTimestamp(undefined, undefined)).toBe(0);
    });
  });

  describe('sortEvents', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-06-14T12:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should sort upcoming events first (closest to furthest) and completed events last (newest to oldest)', () => {
      const futureClose = { _id: 'future-close', eventDateTimeStart: '2026-06-15T10:00:00Z' } as RawEventItem;
      const futureFar = { _id: 'future-far', eventDateTimeStart: '2026-06-20T10:00:00Z' } as RawEventItem;
      const pastRecent = { _id: 'past-recent', eventDateTimeStart: '2026-06-10T10:00:00Z' } as RawEventItem;
      const pastOld = { _id: 'past-old', eventDateTimeStart: '2026-01-01T10:00:00Z' } as RawEventItem;

      const unsortedEvents = [pastOld, futureFar, pastRecent, futureClose];
      const sorted = sortEvents(unsortedEvents);

      expect(sorted[0]._id).toBe('future-close');
      expect(sorted[1]._id).toBe('future-far');
      expect(sorted[2]._id).toBe('past-recent');
      expect(sorted[3]._id).toBe('past-old');
    });

    it('should sort correctly when array contains only upcoming events', () => {
      const eventA = { _id: 'A', eventDateTimeStart: '2026-06-15T10:00:00Z' } as RawEventItem;
      const eventB = { _id: 'B', eventDateTimeStart: '2026-06-16T10:00:00Z' } as RawEventItem;

      const sorted = sortEvents([eventB, eventA]);

      expect(sorted[0]._id).toBe('A');
      expect(sorted[1]._id).toBe('B');
    });

    it('should sort correctly when array contains only completed events', () => {
      const eventA = { _id: 'A', eventDateTimeStart: '2026-06-10T10:00:00Z' } as RawEventItem;
      const eventB = { _id: 'B', eventDateTimeStart: '2026-05-10T10:00:00Z' } as RawEventItem;

      const sorted = sortEvents([eventB, eventA]);

      expect(sorted[0]._id).toBe('A');
      expect(sorted[1]._id).toBe('B');
    });
  });
});
