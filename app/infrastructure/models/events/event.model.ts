import mongoose, { Document, Model, Schema } from 'mongoose';

import { EventDTO, EventStatus } from '~/domain/dto/event.dto';

export interface IEventDocument extends Omit<EventDTO, '_id'>, Document {}

const localizedString = (options: Record<string, unknown> = {}) => ({
  uk: { type: String, ...options },
  en: { type: String, ...options }
});

const localizedObject = (options: Record<string, unknown> = {}) => ({
  uk: { type: Object, ...options },
  en: { type: Object, ...options }
});

const eventSchema = new Schema<IEventDocument>(
  {
    title: localizedString({ required: true }),
    description: localizedString(),
    content: localizedObject({ required: true }),
    slug: { type: String, required: true, index: true, unique: true },
    coverImage: {
      src: { type: String, required: true },
      alt: localizedString({ required: true }),
      caption: localizedString({ required: true }),
      isTmp: { type: Boolean, default: false }
    },
    status: {
      type: String,
      enum: Object.values(EventStatus),
      required: true,
      default: EventStatus.Draft
    },
    meta: {
      views: { type: Number, default: 0, required: true }
    },
    publishedAt: { type: Date, default: null },
    eventLink: { type: String, required: true },
    eventDateTimeStart: { type: Date, default: null },
    eventDateTimeEnd: { type: Date, default: null },
    ticketUrl: localizedString({ default: null })
  },
  {
    timestamps: true,
    collection: 'events'
  }
);

const EventModel: Model<IEventDocument> = mongoose.models.Event || mongoose.model<IEventDocument>('Event', eventSchema);

export default EventModel;
