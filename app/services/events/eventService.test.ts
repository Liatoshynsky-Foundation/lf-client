import { Locale } from 'next-intl';

import { createEventService } from './eventService';

import type { EventRepository } from '~/infrastructure/repositories/events/event.repo';
import logger from '~/middleware/logger/logger';

jest.mock('~/middleware/logger/logger', () => ({
  warn: jest.fn(),
  error: jest.fn()
}));

describe('eventService', () => {
  const eventRepositoryMock = {
    getAllPublishedEvents: jest.fn(),
    getEventBySlug: jest.fn()
  } as unknown as jest.Mocked<EventRepository>;

  const eventService = createEventService({ eventRepository: eventRepositoryMock });
  const locale: Locale = 'uk';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPublishedEvents', () => {
    const baseListItemMock = {
      _id: '507f191e810c19729de860ea',
      slug: 'test-event',
      status: 'published',
      publishedAt: '2026-05-01T00:00:00.000Z',
      eventDateTimeStart: '2026-05-10T16:00:00.000Z',
      eventDateTimeEnd: '2026-05-10T18:00:00.000Z',
      title: { uk: 'Тестова подія', en: 'Test Event' },
      description: { uk: 'Опис події', en: 'Event description' },
      coverImage: {
        src: 'https://img.com/1.jpg',
        alt: { uk: 'Альт', en: 'Alt' },
        caption: { uk: 'Підпис', en: 'Caption' },
        isTmp: false
      },
      meta: { views: 100 },
      ticketUrl: { uk: 'https://tickets.ua', en: 'https://tickets.com' }
    };

    it('fetches and localizes published events', async () => {
      eventRepositoryMock.getAllPublishedEvents.mockResolvedValue([baseListItemMock] as any);

      const result = await eventService.getAllPublishedEvents(locale);

      expect(eventRepositoryMock.getAllPublishedEvents).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Тестова подія');
      expect(result[0].description).toBe('Опис події');
    });

    it('localizes to en locale', async () => {
      eventRepositoryMock.getAllPublishedEvents.mockResolvedValue([baseListItemMock] as any);

      const result = await eventService.getAllPublishedEvents('en');

      expect(result[0].title).toBe('Test Event');
      expect(result[0].description).toBe('Event description');
    });

    it('returns empty array when repository returns empty array', async () => {
      eventRepositoryMock.getAllPublishedEvents.mockResolvedValue([]);

      const result = await eventService.getAllPublishedEvents(locale);

      expect(result).toEqual([]);
    });

    it('returns empty array when repository returns null', async () => {
      eventRepositoryMock.getAllPublishedEvents.mockResolvedValue(null as any);

      const result = await eventService.getAllPublishedEvents(locale);

      expect(result).toEqual([]);
    });

    it('skips invalid records and logs a warning, keeping only valid ones', async () => {
      const invalidItem = { _id: 'not-a-valid-id' };
      eventRepositoryMock.getAllPublishedEvents.mockResolvedValue([baseListItemMock, invalidItem] as any);

      const result = await eventService.getAllPublishedEvents(locale);

      expect(result).toHaveLength(1);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('[SERVICE:Events:getAllPublishedEvents] Skipped 1 invalid event records')
      );
    });

    it('returns empty array and logs an error when repository throws', async () => {
      const dbError = new Error('Database connection failed');
      eventRepositoryMock.getAllPublishedEvents.mockRejectedValue(dbError);

      const result = await eventService.getAllPublishedEvents(locale);

      expect(result).toEqual([]);
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('[SERVICE:Events:getAllPublishedEvents]'),
        dbError
      );
    });
  });

  describe('getEventBySlug', () => {
    const mockContent = {
      uk: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Контент' }] }] },
      en: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Content' }] }] }
    };

    const baseEventMock = {
      _id: '507f191e810c19729de860ea',
      slug: 'event-1',
      title: { uk: 'Назва події', en: 'Event Title' },
      description: { uk: 'Опис події', en: 'Event Description' },
      coverImage: {
        src: 'https://img.com/1.jpg',
        alt: { uk: 'Альт', en: 'Alt' },
        caption: { uk: 'Підпис', en: 'Caption' },
        isTmp: false
      },
      status: 'published',
      meta: { views: 100 },
      publishedAt: '2024-05-01T00:00:00.000Z',
      eventLink: 'https://example.com',
      eventDateTimeStart: '2024-05-10T16:00:00.000Z',
      eventDateTimeEnd: '2024-05-10T18:00:00.000Z',
      content: mockContent,
      ticketUrl: { uk: 'https://tickets.ua', en: 'https://tickets.com' }
    };

    it('returns null when event is not found', async () => {
      eventRepositoryMock.getEventBySlug.mockResolvedValue(null);

      const result = await eventService.getEventBySlug('missing-slug', locale);

      expect(result).toBeNull();
      expect(eventRepositoryMock.getEventBySlug).toHaveBeenCalledWith('missing-slug');
    });

    it('returns localized event for uk locale', async () => {
      eventRepositoryMock.getEventBySlug.mockResolvedValue(baseEventMock as any);

      const result = await eventService.getEventBySlug('event-1', 'uk');

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Назва події');
      expect(result?.description).toBe('Опис події');
    });

    it('returns localized event for en locale', async () => {
      eventRepositoryMock.getEventBySlug.mockResolvedValue(baseEventMock as any);

      const result = await eventService.getEventBySlug('event-1', 'en');

      expect(result?.title).toBe('Event Title');
      expect(result?.description).toBe('Event Description');
    });

    it('localizes content to the requested locale', async () => {
      eventRepositoryMock.getEventBySlug.mockResolvedValue(baseEventMock as any);

      const result = await eventService.getEventBySlug('event-1', 'uk');

      expect(result?.content).toEqual(mockContent.uk);
    });

    it('returns localized ticketUrl for uk locale', async () => {
      eventRepositoryMock.getEventBySlug.mockResolvedValue(baseEventMock as any);

      const result = await eventService.getEventBySlug('event-1', 'uk');

      expect(result?.ticketUrl).toBe('https://tickets.ua');
    });

    it('returns localized ticketUrl for en locale', async () => {
      eventRepositoryMock.getEventBySlug.mockResolvedValue(baseEventMock as any);

      const result = await eventService.getEventBySlug('event-1', 'en');

      expect(result?.ticketUrl).toBe('https://tickets.com');
    });

    it('returns null ticketUrl when ticketUrl is null', async () => {
      eventRepositoryMock.getEventBySlug.mockResolvedValue({ ...baseEventMock, ticketUrl: null } as any);

      const result = await eventService.getEventBySlug('event-1', locale);

      expect(result?.ticketUrl).toBeNull();
    });

    it('returns null ticketUrl when ticketUrl is undefined', async () => {
      const { ticketUrl: _, ...eventWithoutTicketUrl } = baseEventMock;
      eventRepositoryMock.getEventBySlug.mockResolvedValue(eventWithoutTicketUrl as any);

      const result = await eventService.getEventBySlug('event-1', locale);

      expect(result?.ticketUrl).toBeNull();
    });

    it('returns null ticketUrl when locale-specific value is null', async () => {
      eventRepositoryMock.getEventBySlug.mockResolvedValue({
        ...baseEventMock,
        ticketUrl: { uk: null, en: 'https://tickets.com' }
      } as any);

      const result = await eventService.getEventBySlug('event-1', 'uk');

      expect(result?.ticketUrl).toBeNull();
    });

    it('calls repository with the provided slug', async () => {
      eventRepositoryMock.getEventBySlug.mockResolvedValue(null);

      await eventService.getEventBySlug('specific-slug', locale);

      expect(eventRepositoryMock.getEventBySlug).toHaveBeenCalledWith('specific-slug');
    });

    it('returns null and logs an error when repository throws', async () => {
      const criticalError = new Error('Validation or Network failed');
      eventRepositoryMock.getEventBySlug.mockRejectedValue(criticalError);

      const result = await eventService.getEventBySlug('event-1', locale);

      expect(result).toBeNull();
      expect(logger.error).toHaveBeenCalled();
    });
  });
});