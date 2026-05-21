import { EventStatus } from '~/domain/dto/events.dto';
import dbConnect from '~/infrastructure/db/connect';
import EventModel from '~/infrastructure/models/events/events.model';
import { ArraySchema } from '~/validators/constants';
import { eventListItemSchema, eventSchema } from '~/validators/events.schema';

const eventsRepository = {
  async getAllPublishedEvents() {
    await dbConnect();

    const events = await EventModel.find({ status: EventStatus.Published })
      .select(
        '_id slug status publishedAt eventDateTimeStart eventDateTimeEnd title description coverImage meta ticketUrl'
      )
      .sort({ publishedAt: -1 })
      .lean();

    if (!events) {
      return [];
    }

    return ArraySchema(eventListItemSchema).parse(events);
  },

  async getEventBySlug(slug: string) {
    await dbConnect();

    const event = await EventModel.findOne({ slug }).lean();

    if (!event) return null;

    return eventSchema.parse(event);
  }
};

function newEventsRepository(): typeof eventsRepository {
  return eventsRepository;
}

export default newEventsRepository;
