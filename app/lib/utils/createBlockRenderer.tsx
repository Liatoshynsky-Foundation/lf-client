import { ComponentType } from 'react';

import { IAboutUsPage } from '~/types/page/about-us.types';
import { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

type PossibleBlocks = IAboutUsPage['blocks'] | PrivacyPolicyPage['blocks'];

type RendererProps<TBlocks extends PossibleBlocks> = {
  blocks: TBlocks;
  title: string;
};

export function createBlockRenderer<TBlocks extends PossibleBlocks>({
  BLOCKS_RENDERER,
  BLOCK_NAMES_MAP
}: {
  BLOCKS_RENDERER: Record<keyof TBlocks, ComponentType<RendererProps<TBlocks>>>;
  BLOCK_NAMES_MAP?: Record<string, keyof TBlocks>;
}) {
  const BlockRenderer = ({ blockId, blocks, title }: { blockId: string; blocks: TBlocks; title?: string }) => {
    const id = BLOCK_NAMES_MAP && blockId in BLOCK_NAMES_MAP ? BLOCK_NAMES_MAP[blockId] : blockId;

    if (!(id in BLOCKS_RENDERER)) {
      console.warn(`Block ID "${id as string}" is missing from BLOCKS_RENDERER`);
      return null;
    }

    const Component = BLOCKS_RENDERER[id as keyof TBlocks] ? (BLOCKS_RENDERER[id] as React.ElementType) : undefined;

    if (!Component) return null;

    return <Component key={id as string} blocks={blocks} title={title ?? ''} />;
  };

  BlockRenderer.displayName = 'BlockRenderer';

  return BlockRenderer;
}
