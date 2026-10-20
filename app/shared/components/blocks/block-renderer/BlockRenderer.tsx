import { ComponentType } from 'react';

import { isLocalizedManagedPageSection } from '~/lib/utils/managedPageSections';
import ManagedPageSection from '~/shared/components/blocks/managed-page-section/ManagedPageSection';

type RendererProps<T> = {
  blocks: T;
  title: string;
};

export interface BlockRendererProps<T> {
  blockId: string;
  blocks: T;
  title?: string;
  rendererMap: Record<keyof T, ComponentType<RendererProps<T>>>;
  namesMap?: Record<string, keyof T>;
}

export function BlockRenderer<T>({ blockId, blocks, title, rendererMap, namesMap }: Readonly<BlockRendererProps<T>>) {
  const id = namesMap && blockId in namesMap ? namesMap[blockId] : blockId;
  const blockData = (blocks as Record<string, { hidden?: boolean } | undefined>)[String(id)];

  if (blockData?.hidden) {
    return null;
  }

  if (isLocalizedManagedPageSection(blockData)) {
    return <ManagedPageSection data={blockData} />;
  }

  if (!(id in rendererMap)) {
    // eslint-disable-next-line no-console
    console.warn(`Block ID "${String(id)}" is missing from BLOCKS_RENDERER`);
    return null;
  }

  const Component = rendererMap[id] as React.ElementType;

  return <Component key={id} blocks={blocks} title={title ?? ''} />;
}
