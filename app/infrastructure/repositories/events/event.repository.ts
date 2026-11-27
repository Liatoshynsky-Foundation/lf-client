import { EventStatus } from '~/domain/dto/events.dto';
import dbConnect from '~/infrastructure/db/connect';
import EventModel from '~/infrastructure/models/events/event.model';

const EVENT_LIST_FIELDS =
  '_id slug status publishedAt eventDateTimeStart eventDateTimeEnd title description coverImage meta ticketUrl';

const eventRepository = {
  async getAllPublishedEvents() {
    await dbConnect();

    const events = await EventModel.find({ status: EventStatus.Published })
      .select(EVENT_LIST_FIELDS)
      .sort({ publishedAt: -1 })
      .lean();

    return events ?? [];
  },

  async getEventBySlug(slug: string, includeUnpublished = false) {
    await dbConnect();

    const filter = includeUnpublished ? { slug } : { slug, status: EventStatus.Published };
    return EventModel.findOne(filter).lean();
  }
};

function newEventRepository(): typeof eventRepository {
  return eventRepository;
}

export default newEventRepository;
