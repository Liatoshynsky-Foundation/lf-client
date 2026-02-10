import { Types } from 'mongoose';

export enum NewsStatus {
  Draft = 'draft',
  Published = 'published',
  Hidden = 'hidden',
  Archived = 'archived',
  Editing = 'editing'
}

export type NewsImageDTO = {
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

export type NewsDTO = {
  _id: Types.ObjectId | string;
  publishedAt: Date | null;
  newsDate: Date | null;
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
  coverImage: NewsImageDTO;
  status: NewsStatus;
  meta: {
    views: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export type NewsListItemDTO = Pick<
  NewsDTO,
  '_id' | 'publishedAt' | 'newsDate' | 'title' | 'description' | 'slug' | 'coverImage' | 'meta'
>;
