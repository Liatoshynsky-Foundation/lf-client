import { EventStatus } from '~/domain/dto/event.dto';
import dbConnect from '~/infrastructure/db/connect';
import EventModel from '~/infrastructure/models/events/event.model';
import { ArraySchema } from '~/validators/constants';
import { eventListItemSchema, eventSchema } from '~/validators/event.schema';

const eventRepository = {
  async getAllPublishedEvents() {
    await dbConnect();

    const events = await EventModel.find({ status: EventStatus.Published })
      .select('_id title description slug coverImage meta eventDateTimeStart eventDateTimeEnd')
      .sort({ eventDateTimeStart: -1 })
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

function newEventRepository(): typeof eventRepository {
  return eventRepository;
}

export default newEventRepository;
