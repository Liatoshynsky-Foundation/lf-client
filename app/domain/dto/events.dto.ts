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
  slug: string;
  status: EventStatus;

  publishedAt: string | null;
  eventDateTimeStart: string | null;
  eventDateTimeEnd: string | null;

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

  coverImage: EventImageDTO;
  meta: {
    views: number;
  };

  eventLink?: string;
  ticketUrl?: { uk: string; en: string } | object;

  createdAt?: string;
  updatedAt?: string;
};

export type EventListItemDTO = Pick<
  EventDTO,
  | '_id'
  | 'slug'
  | 'status'
  | 'publishedAt'
  | 'eventDateTimeStart'
  | 'eventDateTimeEnd'
  | 'title'
  | 'description'
  | 'coverImage'
  | 'meta'
  | 'ticketUrl'
>;
