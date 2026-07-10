import { EventStatus } from '~/domain/dto/event.dto';
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

  async getEventBySlug(slug: string) {
    await dbConnect();

    return EventModel.findOne({ slug, status: EventStatus.Published }).lean();
  }
};

function newEventRepository(): typeof eventRepository {
  return eventRepository;
}

export default newEventRepository;
