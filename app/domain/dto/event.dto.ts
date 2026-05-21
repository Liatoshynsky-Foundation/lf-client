export enum EventStatus {
  Draft = 'draft',
  Published = 'published',
  Hidden = 'hidden',
  Archived = 'archived',
  Editing = 'editing'
}

export type EventImageDTO = {
  src: string;
  alt: {
    uk: string;
    en: string;
  };
  caption: {
    uk: string;
    en: string;
  };
  isTmp: boolean;
};

export type EventDTO = {
  _id: string;
  title: {
    uk: string;
    en: string;
  };
  description: {
    uk: string;
    en: string;
  };
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
  ticketUrl: {
    uk: string | null;
    en: string | null;
  } | null;
  createdAt?: string;
  updatedAt?: string;
};

export type EventListItemDTO = Pick<
  EventDTO,
  '_id' | 'title' | 'description' | 'slug' | 'coverImage' | 'meta' | 'eventDateTimeStart' | 'eventDateTimeEnd'
>;
