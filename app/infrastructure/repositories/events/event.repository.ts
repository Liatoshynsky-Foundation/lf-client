import { EventStatus } from '~/domain/dto/event.dto';
import dbConnect from '~/infrastructure/db/connect';
import EventModel from '~/infrastructure/models/events/event.model';

const eventRepository = {
  async getAllPublishedEvents() {
    await dbConnect();

    const events = await EventModel.find({ status: EventStatus.Published })
      .select('_id title description slug coverImage meta eventDateTimeStart eventDateTimeEnd')
      .sort({ eventDateTimeStart: -1 })
      .lean();

    return events ?? [];
  },

  async getEventBySlug(slug: string) {
    await dbConnect();

    return EventModel.findOne({ slug }).lean();
  }
};

function newEventRepository(): typeof eventRepository {
  return eventRepository;
}

export default newEventRepository;
