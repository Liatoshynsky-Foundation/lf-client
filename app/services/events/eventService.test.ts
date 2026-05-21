import { Locale } from 'next-intl';

import { createEventService } from './eventService';

import type { EventRepository } from '~/infrastructure/repositories/events/event.repo';

describe('eventService', () => {
  const eventRepositoryMock = {
    getAllPublishedEvents: jest.fn(),
    getEventBySlug: jest.fn()
  } as unknown as jest.Mocked<EventRepository>;

  const eventService = createEventService({ eventRepository: eventRepositoryMock });
  const locale: Locale = 'uk';

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ─── getAllPublishedEvents ────────────────────────────────────────────────────

  describe('getAllPublishedEvents', () => {
    it('fetches and localizes published events', async () => {
      eventRepositoryMock.getAllPublishedEvents.mockResolvedValue([baseEventMock] as any);

      const result = await eventService.getAllPublishedEvents(locale);

      expect(eventRepositoryMock.getAllPublishedEvents).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Назва події');
      expect(result[0].description).toBe('Опис події');
    });

    it('localizes to en locale', async () => {
      eventRepositoryMock.getAllPublishedEvents.mockResolvedValue([baseEventMock] as any);

      const result = await eventService.getAllPublishedEvents('en');

      expect(result[0].title).toBe('Event Title');
      expect(result[0].description).toBe('Event Description');
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

    it('returns empty array when repository throws', async () => {
      eventRepositoryMock.getAllPublishedEvents.mockRejectedValue(new Error('DB Error'));

      const result = await eventService.getAllPublishedEvents(locale);

      expect(result).toEqual([]);
    });
  });

  // ─── getEventBySlug ──────────────────────────────────────────────────────────

  describe('getEventBySlug', () => {
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
  });
});
