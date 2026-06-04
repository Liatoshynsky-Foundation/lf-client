import { LocalizedString } from '~/types/types/common.types';

export enum EventStatus {
  Draft = 'draft',
  Published = 'published',
  Hidden = 'hidden',
  Archived = 'archived',
  Editing = 'editing'
}

export type EventImageDTO = {
  src: string;
  alt: LocalizedString;
  caption: LocalizedString;
  isTmp: boolean;
};

export type EventDTO = {
  _id: string;
  title: LocalizedString;
  description: LocalizedString;
  content: {
    uk: object;
    en: object;
  };
  slug: string;
  coverImage: EventImageDTO;
  status: EventStatus;
  meta: {
    views: number;
  };
  publishedAt: string | null;
  eventLink: string;
  eventDateTimeStart: string | null;
  eventDateTimeEnd: string | null;
  ticketUrl: Record<'uk' | 'en', string | null> | null;
  createdAt?: string;
  updatedAt?: string;
};

export type EventListItemDTO = Pick<
  EventDTO,
  '_id' | 'title' | 'description' | 'slug' | 'coverImage' | 'meta' | 'eventDateTimeStart' | 'eventDateTimeEnd'
>;
