import { ComponentType } from 'react';

import { PossibleBlocks } from '../../page-builder/PageBuilder';

type RendererProps<TBlocks extends PossibleBlocks> = {
  blocks: TBlocks;
  title: string;
};

export interface BlockRendererProps<TBlocks extends PossibleBlocks> {
  blockId: string;
  blocks: TBlocks;
  title?: string;
  rendererMap: Record<keyof TBlocks, ComponentType<RendererProps<TBlocks>>>;
  namesMap?: Record<string, keyof TBlocks>;
}

export function BlockRenderer<TBlocks extends PossibleBlocks>({
  blockId,
  blocks,
  title,
  rendererMap,
  namesMap
}: Readonly<BlockRendererProps<TBlocks>>) {
  const id = namesMap && blockId in namesMap ? namesMap[blockId] : blockId;

  if (!(id in rendererMap)) {
    console.warn(`Block ID "${id as string}" is missing from BLOCKS_RENDERER`);
    return null;
  }

  const Component = rendererMap[id as keyof TBlocks] as React.ElementType;

  return <Component key={id as string} blocks={blocks} title={title ?? ''} />;
}
