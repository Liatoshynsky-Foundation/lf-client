import newEventRepository from './event.repository';

import { EventStatus } from '~/domain/dto/event.dto';
import dbConnect from '~/infrastructure/db/connect';
import EventModel from '~/infrastructure/models/events/event.model';

jest.mock('~/infrastructure/db/connect', () => jest.fn());
jest.mock('~/infrastructure/models/events/event.model', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findOne: jest.fn()
  }
}));

describe('eventRepository', () => {
  const repository = newEventRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPublishedEvents', () => {
    it('should fetch and return all published events ordered by start date', async () => {
      const mockEvents = [
        { _id: '1', slug: 'e-1', status: EventStatus.Published, title: 'E1' },
        { _id: '2', slug: 'e-2', status: EventStatus.Published, title: 'E2' }
      ];

      const mockLean = jest.fn().mockResolvedValue(mockEvents);
      const mockSort = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();

      (EventModel.find as jest.Mock).mockReturnValue({
        select: mockSelect.mockReturnValue({
          sort: mockSort.mockReturnValue({
            lean: mockLean
          })
        })
      });

      const result = await repository.getAllPublishedEvents();

      expect(dbConnect).toHaveBeenCalledTimes(1);
      expect(EventModel.find).toHaveBeenCalledWith({ status: EventStatus.Published });
      expect(mockSelect).toHaveBeenCalledWith(
        '_id title description slug coverImage meta eventDateTimeStart eventDateTimeEnd'
      );
      expect(mockSort).toHaveBeenCalledWith({ eventDateTimeStart: -1 });
      expect(result).toEqual(mockEvents);
    });

    it('should return an empty array if find query results in a falsy value', async () => {
      const mockLean = jest.fn().mockResolvedValue(null);
      const mockSort = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();

      (EventModel.find as jest.Mock).mockReturnValue({
        select: mockSelect.mockReturnValue({
          sort: mockSort.mockReturnValue({
            lean: mockLean
          })
        })
      });

      const result = await repository.getAllPublishedEvents();

      expect(result).toEqual([]);
    });
  });

  describe('getEventBySlug', () => {
    it('should fetch and return a specific event matching the slug', async () => {
      const mockEvent = { _id: '123', slug: 'target-slug', title: 'Target' };
      const mockLean = jest.fn().mockResolvedValue(mockEvent);

      (EventModel.findOne as jest.Mock).mockReturnValue({
        lean: mockLean
      });

      const result = await repository.getEventBySlug('target-slug');

      expect(dbConnect).toHaveBeenCalledTimes(1);
      expect(EventModel.findOne).toHaveBeenCalledWith({ slug: 'target-slug' });
      expect(result).toEqual(mockEvent);
    });
  });
});
