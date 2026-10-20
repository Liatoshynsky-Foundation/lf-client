import { RichContent } from '~/types/types/tiptap.types';

export const MANAGED_PAGE_SECTION_KIND = 'managedPageSection' as const;

export const MANAGED_PAGE_SECTION_ITEM_TYPE = {
  SUBTITLE: 'subtitle',
  PARAGRAPH: 'paragraph',
  BULLET: 'bullet'
} as const;

export type ManagedPageSectionItemType =
  (typeof MANAGED_PAGE_SECTION_ITEM_TYPE)[keyof typeof MANAGED_PAGE_SECTION_ITEM_TYPE];

export type ManagedPageSectionItem<T = RichContent> = {
  id: string;
  type: ManagedPageSectionItemType;
  value: T;
};

export type ManagedPageSectionBlock<T = RichContent> = {
  kind: typeof MANAGED_PAGE_SECTION_KIND;
  title: T;
  items: ManagedPageSectionItem<T>[];
  hidden?: boolean;
};
