import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Fragment } from 'react';

type TextStyles = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type TextContent = {
  type: 'text';
  text: string;
  styles: TextStyles;
};

type LinkContent = {
  type: 'link';
  href: string;
  content: TextContent[];
};

type InlineContent = TextContent | LinkContent;

export type BlockNoteBlock = {
  id: string;
  type: string;
  props: Record<string, unknown>;
  content?: InlineContent[];
  children: BlockNoteBlock[];
};

type ListGroup = { isGroup: true; listType: 'bullet' | 'numbered'; items: BlockNoteBlock[] };
type BlockOrGroup = BlockNoteBlock | ListGroup;

function applyTextStyles(item: TextContent): React.ReactNode {
  let node: React.ReactNode = item.text;
  if (item.styles?.bold) node = <strong>{node}</strong>;
  if (item.styles?.italic) node = <em>{node}</em>;
  if (item.styles?.underline) node = <u>{node}</u>;
  if (item.styles?.strikethrough) node = <s>{node}</s>;
  if (item.styles?.code) node = <code>{node}</code>;
  return node;
}

function renderInline(content: InlineContent[]): React.ReactNode {
  return content.map((item) => {
    if (item.type === 'link') {
      return (
        <a key={`link-${item.href}`} href={item.href} target="_blank" rel="noopener noreferrer">
          {item.content.map((c) => (
            <Fragment key={`text-${c.text}`}>{applyTextStyles(c)}</Fragment>
          ))}
        </a>
      );
    }
    return <Fragment key={`text-${item.text}`}>{applyTextStyles(item)}</Fragment>;
  });
}

function groupBlocks(blocks: BlockNoteBlock[]): BlockOrGroup[] {
  const result: BlockOrGroup[] = [];

  for (const block of blocks) {
    const isBullet = block.type === 'bulletListItem';
    const isNumbered = block.type === 'numberedListItem';

    if (isBullet || isNumbered) {
      const listType = isBullet ? 'bullet' : 'numbered';
      const last = result.at(-1);
      if (last && 'isGroup' in last && last.listType === listType) {
        last.items.push(block);
      } else {
        result.push({ isGroup: true, listType, items: [block] });
      }
    } else {
      result.push(block);
    }
  }

  return result;
}

function renderBlock(block: BlockNoteBlock): React.ReactNode {
  const inline = block.content ? renderInline(block.content) : null;

  switch (block.type) {
    case 'paragraph':
      return (
        <Typography key={block.id} variant="body1" component="p" sx={{ mb: 2 }}>
          {inline}
        </Typography>
      );

    case 'heading': {
      const level = (block.props.level as number) ?? 1;
      const variant = `h${Math.min(level, 3)}` as 'h1' | 'h2' | 'h3';
      return (
        <Typography key={block.id} variant={variant} sx={{ mt: 4, mb: 2 }}>
          {inline}
        </Typography>
      );
    }

    case 'bulletListItem':
    case 'numberedListItem':
      return (
        <Box key={block.id} component="li">
          {inline}
          {block.children.length > 0 && (
            <Box component="ul" sx={{ pl: 2 }}>
              {block.children.map(renderBlock)}
            </Box>
          )}
        </Box>
      );

    case 'checkListItem': {
      const checked = block.props.checked as boolean;
      return (
        <Box key={block.id} component="li" sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <input type="checkbox" checked={checked} readOnly />
          <span>{inline}</span>
        </Box>
      );
    }

    case 'image': {
      const src = block.props.url as string;
      const alt = (block.props.caption as string) ?? '';
      if (!src) return null;
      return (
        <Box key={block.id} sx={{ position: 'relative', width: '100%', height: { xs: '240px', md: '400px' }, my: 3 }}>
          <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} />
          {alt && (
            <Typography variant="caption" component="figcaption" sx={{ mt: 1, textAlign: 'center', display: 'block' }}>
              {alt}
            </Typography>
          )}
        </Box>
      );
    }

    default:
      return inline ? (
        <Box key={block.id} sx={{ mb: 2 }}>
          {inline}
        </Box>
      ) : null;
  }
}

function renderGroup(group: BlockOrGroup, index: number): React.ReactNode {
  if ('isGroup' in group) {
    const Component = group.listType === 'bullet' ? 'ul' : 'ol';
    return (
      <Box key={index} component={Component} sx={{ pl: 3, mb: 2 }}>
        {group.items.map(renderBlock)}
      </Box>
    );
  }
  return <Fragment key={group.id}>{renderBlock(group)}</Fragment>;
}

type BlockNoteContentProps = {
  blocks: BlockNoteBlock[];
};

export function BlockNoteContent({ blocks }: Readonly<BlockNoteContentProps>) {
  const groups = groupBlocks(blocks);
  return <Box>{groups.map((group, index) => renderGroup(group, index))}</Box>;
}
