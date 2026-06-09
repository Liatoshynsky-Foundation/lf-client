export enum MediaMentionStatus {
  Draft = 'draft',
  Published = 'published',
  Hidden = 'hidden',
  Archived = 'archived',
  Editing = 'editing'
}

export type MediaMentionCoverImageDTO = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  crop?: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
};

export type MediaMentionMetaDTO = {
  views: number;
};

export type MediaMentionDTO = {
  _id: string;
  url: string;
  title: string;
  description: string;
  slug: string;
  coverImage: MediaMentionCoverImageDTO;
  status: MediaMentionStatus;
  publishedAt?: string | null;
  meta: MediaMentionMetaDTO;
  createdAt?: string;
  updatedAt?: string;
};

export type MediaMentionListItemDTO = Pick<
  MediaMentionDTO,
  '_id' | 'url' | 'title' | 'description' | 'slug' | 'coverImage' | 'publishedAt' | 'meta'
>;
