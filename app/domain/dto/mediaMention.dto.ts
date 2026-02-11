export enum MediaMentionStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Hidden = 'HIDDEN',
  Archived = 'ARCHIVED',
  Editing = 'EDITING'
}

export type MediaMentionCoverImageDTO = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
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
  '_id' | 'title' | 'description' | 'slug' | 'coverImage' | 'publishedAt' | 'meta'
>;
