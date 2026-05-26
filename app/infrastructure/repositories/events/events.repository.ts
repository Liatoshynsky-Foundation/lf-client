import { EventStatus } from '~/domain/dto/events.dto';
import dbConnect from '~/infrastructure/db/connect';
import EventModel from '~/infrastructure/models/events/events.model';
import { ArraySchema } from '~/validators/constants';
import { eventListItemSchema, eventSchema } from '~/validators/events.schema';

const EVENT_LIST_FIELDS =
  '_id slug status publishedAt eventDateTimeStart eventDateTimeEnd title description coverImage meta ticketUrl';

const eventsRepository = {
  async getAllPublishedEvents() {
    await dbConnect();

    const events = await EventModel.find({ status: EventStatus.Published })
      .select(EVENT_LIST_FIELDS)
      .sort({ publishedAt: -1 })
      .lean();

    return ArraySchema(eventListItemSchema).parse(events);
  },

  async getEventBySlug(slug: string) {
    await dbConnect();

    const event = await EventModel.findOne({ slug }).lean();

    if (!event) return null;

    return eventSchema.parse(event);
  }
};

export default eventsRepository;
