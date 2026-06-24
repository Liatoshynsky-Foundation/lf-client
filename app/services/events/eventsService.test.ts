import { Locale } from 'next-intl';

import { createEventsService } from './eventsService';

import eventsRepositoryObj from '~/infrastructure/repositories/events/events.repository';
import logger from '~/middleware/logger/logger';

jest.mock('~/middleware/logger/logger', () => ({
  error: jest.fn()
}));

jest.mock('~/validators/constants', () => ({
  ArraySchema: jest.fn(() => ({
    parse: jest.fn((data) => data)
  }))
}));

jest.mock('~/validators/localization', () => ({
  LocalizeSchema: jest.fn(() => ({
    safeParse: jest.fn((data) => ({
      success: true,
      data
    })),
    parse: jest.fn((data) => data)
  }))
}));

describe('eventsService', () => {
  const eventsRepositoryMock = {
    getAllPublishedEvents: jest.fn(),
    getEventBySlug: jest.fn()
  } as unknown as jest.Mocked<typeof eventsRepositoryObj>;

  const eventsService = createEventsService({ eventsRepository: eventsRepositoryMock });
  const locale: Locale = 'uk';

  const baseEventMock = {
    _id: '507f191e810c19729de860ea',
    slug: 'test-event',
    title: { uk: 'Тестова подія', en: 'Test Event' },
    description: { uk: 'Опис події', en: 'Event description' },
    status: 'published',
    createdAt: '2026-05-26T10:00:00Z'
  };

  type RepoEventsType = Awaited<ReturnType<typeof eventsRepositoryObj.getAllPublishedEvents>>;
  type RepoSingleEventType = Awaited<ReturnType<typeof eventsRepositoryObj.getEventBySlug>>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPublishedEvents', () => {
    it('should fetch and parse published events successfully', async () => {
      eventsRepositoryMock.getAllPublishedEvents.mockResolvedValue([baseEventMock] as unknown as RepoEventsType);

      const result = await eventsService.getAllPublishedEvents(locale);

      expect(result).toHaveLength(1);
      expect(result[0].title as unknown).toEqual(baseEventMock.title);
      expect(eventsRepositoryMock.getAllPublishedEvents).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if repository returns an empty array', async () => {
      eventsRepositoryMock.getAllPublishedEvents.mockResolvedValue([] as unknown as RepoEventsType);

      const result = await eventsService.getAllPublishedEvents(locale);

      expect(result).toEqual([]);
      expect(eventsRepositoryMock.getAllPublishedEvents).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array and log an error if repository throws (catch block coverage)', async () => {
      const dbError = new Error('Database connection failed');
      eventsRepositoryMock.getAllPublishedEvents.mockRejectedValue(dbError);

      const result = await eventsService.getAllPublishedEvents(locale);

      expect(result).toEqual([]);
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('[SERVICE:Events:getAllPublishedEvents]'),
        dbError
      );
    });
  });

  describe('getEventBySlug', () => {
    it('should return localized event if found by slug', async () => {
      eventsRepositoryMock.getEventBySlug.mockResolvedValue(baseEventMock as unknown as RepoSingleEventType);

      const result = await eventsService.getEventBySlug('test-event', locale);

      expect(result).not.toBeNull();
      expect(result?.title as unknown).toEqual(baseEventMock.title);
      expect(eventsRepositoryMock.getEventBySlug).toHaveBeenCalledWith('test-event');
    });

    it('should return null if event is not found', async () => {
      eventsRepositoryMock.getEventBySlug.mockResolvedValue(null);

      const result = await eventsService.getEventBySlug('non-existent', locale);

      expect(result).toBeNull();
      expect(eventsRepositoryMock.getEventBySlug).toHaveBeenCalledWith('non-existent');
    });

    it('should return null and log an error if an exception occurs (catch block coverage)', async () => {
      const criticalError = new Error('Validation or Network failed');
      eventsRepositoryMock.getEventBySlug.mockRejectedValue(criticalError);

      const result = await eventsService.getEventBySlug('test-event', locale);

      expect(result).toBeNull();
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('[SERVICE:Events:getEventBySlug]'),
        criticalError
      );
    });
  });
});
