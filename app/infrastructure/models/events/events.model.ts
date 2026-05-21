import mongoose, { Document, Model, Schema } from 'mongoose';

import { EventDTO, EventStatus } from '~/domain/dto/events.dto';

export interface IEventDocument extends Omit<EventDTO, '_id'>, Document {}

const eventSchema = new Schema<IEventDocument>(
  {
    slug: { type: String, required: true, index: true, unique: true },
    status: {
      type: String,
      enum: [EventStatus.Draft, EventStatus.Published, EventStatus.Hidden, EventStatus.Archived, EventStatus.Editing],
      required: true,
      default: EventStatus.Draft
    },
    publishedAt: { type: Date, default: null },
    eventDateTimeStart: { type: Date, default: null },
    eventDateTimeEnd: { type: Date, default: null },
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
    meta: {
      views: { type: Number, default: 0, required: true }
    },
    eventLink: { type: String, default: null },
    ticketUrl: { type: Object, default: null }
  },
  {
    timestamps: true,
    collection: 'events'
  }
);

const EventModel: Model<IEventDocument> = mongoose.models.Event || mongoose.model<IEventDocument>('Event', eventSchema);

export default EventModel;
