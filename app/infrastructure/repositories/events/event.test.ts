import newEventRepository from './event.repository';

import { EventStatus } from '~/domain/dto/event.dto';
import dbConnect from '~/infrastructure/db/connect';
import EventModel from '~/infrastructure/models/events/event.model';

jest.mock('~/infrastructure/db/connect', () => ({ __esModule: true, default: jest.fn() }));

jest.mock('~/infrastructure/models/events/event.model', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findOne: jest.fn()
  }
}));

const eventRepository = newEventRepository();

const mockMongooseChain = (resolvedValue: unknown) => ({
  select: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(resolvedValue)
});

const validEventData = {
  _id: '65f1d5f210000000a1b2c3d4',
  slug: 'test-event-slug',
  status: EventStatus.Published,
  publishedAt: '2026-05-01T00:00:00.000Z',
  eventDateTimeStart: '2026-05-10T16:00:00.000Z',
  eventDateTimeEnd: '2026-05-10T18:00:00.000Z',
  title: { uk: 'Назва', en: 'Title' },
  description: { uk: 'Опис', en: 'Description' },
  coverImage: {
    src: 'https://example.com/event-cover.jpg',
    alt: { uk: 'Альт', en: 'Alt' },
    caption: { uk: 'Підпис', en: 'Caption' },
    isTmp: false
  },
  meta: { views: 10 },
  ticketUrl: { uk: 'https://tickets.ua', en: 'https://tickets.com' }
};

describe('eventRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('newEventRepository', () => {
    it('should return the repository instance', () => {
      const repo = newEventRepository();
      expect(repo).toBeDefined();
      expect(typeof repo.getAllPublishedEvents).toBe('function');
      expect(typeof repo.getEventBySlug).toBe('function');
    });
  });

  describe('getAllPublishedEvents', () => {
    it('should query only published events, selecting the full list field set, sorted by publishedAt desc', async () => {
      const chain = mockMongooseChain([validEventData]);
      (EventModel.find as jest.Mock).mockReturnValue(chain);

      const result = await eventRepository.getAllPublishedEvents();

      expect(dbConnect).toHaveBeenCalled();
      expect(EventModel.find).toHaveBeenCalledWith({ status: EventStatus.Published });
      expect(chain.select).toHaveBeenCalledWith(
        '_id slug status publishedAt eventDateTimeStart eventDateTimeEnd title description coverImage meta ticketUrl'
      );
      expect(chain.sort).toHaveBeenCalledWith({ publishedAt: -1 });
      expect(result).toEqual([validEventData]);
    });

    it('should return empty array if events query result is falsy', async () => {
      (EventModel.find as jest.Mock).mockReturnValue(mockMongooseChain(null));

      const result = await eventRepository.getAllPublishedEvents();

      expect(result).toEqual([]);
    });
  });

  describe('getEventBySlug', () => {
    it('should query by slug AND published status, so a cancelled (unpublished) event is not returned', async () => {
      (EventModel.findOne as jest.Mock).mockReturnValue(mockMongooseChain(validEventData));

      const result = await eventRepository.getEventBySlug('test-event-slug');

      expect(dbConnect).toHaveBeenCalled();
      expect(EventModel.findOne).toHaveBeenCalledWith({
        slug: 'test-event-slug',
        status: EventStatus.Published
      });
      expect(result).toEqual(validEventData);
    });

    it('should return null when event with given slug is not published (cancelled)', async () => {
      (EventModel.findOne as jest.Mock).mockReturnValue(mockMongooseChain(null));

      const result = await eventRepository.getEventBySlug('cancelled-event-slug');

      expect(EventModel.findOne).toHaveBeenCalledWith({
        slug: 'cancelled-event-slug',
        status: EventStatus.Published
      });
      expect(result).toBeNull();
    });
  });
});