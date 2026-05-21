import mongoose, { Document, Model, Schema } from 'mongoose';

import { EventDTO, EventStatus } from '~/domain/dto/event.dto';

export interface IEventDocument extends Omit<EventDTO, '_id'>, Document {}

const eventSchema = new Schema<IEventDocument>(
  {
    title: {
      uk: { type: String, required: true },
      en: { type: String, required: true }
    },
    description: {
      uk: { type: String },
      en: { type: String }
    },
    content: {
      uk: { type: Object, required: true },
      en: { type: Object, required: true }
    },
    slug: { type: String, required: true, index: true, unique: true },
    coverImage: {
      src: { type: String, required: true },
      alt: {
        uk: { type: String, required: true },
        en: { type: String, required: true }
      },
      caption: {
        uk: { type: String, required: true },
        en: { type: String, required: true }
      },
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
    ticketUrl: {
      uk: { type: String, default: null },
      en: { type: String, default: null }
    }
  },
  {
    timestamps: true,
    collection: 'events'
  }
);

const EventModel: Model<IEventDocument> = mongoose.models.Event || mongoose.model<IEventDocument>('Event', eventSchema);

export default EventModel;
