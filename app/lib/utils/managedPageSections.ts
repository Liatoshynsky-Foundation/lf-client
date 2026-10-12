import {
  MANAGED_PAGE_SECTION_KIND,
  type ManagedPageSectionBlock,
  type ManagedPageSectionItem
} from '~/types/page/managed-page-section.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { extractTextFromTipTap } from '~/lib/utils/tiptapHelpers';

type Locale = 'uk' | 'en';

export const isManagedPageSectionBlock = (value: unknown): value is ManagedPageSectionBlock<unknown> => {
  if (typeof value !== 'object' || value === null) return false;

  const block = value as Record<string, unknown>;
  return block.kind === MANAGED_PAGE_SECTION_KIND && 'title' in block && Array.isArray(block.items);
};

export const hasLocaleContent = (value: unknown, locale: Locale): boolean => {
  if (typeof value === 'string') return value.trim() !== '';
  if (typeof value !== 'object' || value === null) return false;

  const record = value as Record<string, unknown>;
  if (locale in record) {
    return hasLocaleContent(record[locale], locale);
  }

  return extractTextFromTipTap(value, locale).trim() !== '';
};

const sanitizeManagedSection = (
  block: ManagedPageSectionBlock<unknown>,
  locale: Locale
): ManagedPageSectionBlock<unknown> | null => {
  if (!hasLocaleContent(block.title, locale)) return null;

  return {
    ...block,
    items: (block.items ?? []).filter((item: ManagedPageSectionItem<unknown>) => hasLocaleContent(item.value, locale))
  };
};

export const prepareManagedPageSections = <T>(page: T, locale: Locale): T => {
  if (typeof page !== 'object' || page === null) return page;

  const record = page as T & { blocks?: Record<string, unknown>; blocksOrder?: string[] };
  if (!record.blocks || typeof record.blocks !== 'object' || Array.isArray(record.blocks)) {
    return page;
  }

  const managedEntries = Object.entries(record.blocks).filter(([, block]) => isManagedPageSectionBlock(block));
  if (managedEntries.length === 0) return page;

  const nextBlocks = { ...record.blocks };
  const droppedIds = new Set<string>();

  managedEntries.forEach(([blockId, block]) => {
    const sanitized = sanitizeManagedSection(block as ManagedPageSectionBlock<unknown>, locale);
    if (!sanitized) {
      droppedIds.add(blockId);
      delete nextBlocks[blockId];
      return;
    }

    nextBlocks[blockId] = sanitized;
  });

  return {
    ...record,
    blocks: nextBlocks,
    blocksOrder: Array.isArray(record.blocksOrder)
      ? record.blocksOrder.filter((blockId) => !droppedIds.has(blockId))
      : record.blocksOrder
  };
};

export const isLocalizedManagedPageSection = (value: unknown): value is ManagedPageSectionBlock<string | TipTapDoc> =>
  isManagedPageSectionBlock(value);
