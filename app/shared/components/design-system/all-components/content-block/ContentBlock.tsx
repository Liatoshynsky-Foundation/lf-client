import { Theme } from '@emotion/react';
import { Box, SxProps, Typography } from '@mui/material';

import { styles } from './ContentBlock.styles';
import type { TipTapDoc } from '~/types/types/common.types';

import { sxToArray } from '~/lib/utils/sxToArray';
import ListItem from '~/shared/components/list-item/ListItem';
import SectionTitle from '~/shared/components/section-title/SectionTitle';
import TipTapContent from '~/shared/components/tip-tap-content/TipTapContent';
import { Typography as textStyles } from '~/shared/components/title-with-description/TitleWithDescription.styles';

type Paragraph = Readonly<{
  id: number;
  text: string;
}>;

type RichContent = string | Paragraph[] | TipTapDoc;

type ContentBlockProps = Readonly<{
  title?: string;
  description?: RichContent;
  list?: RichContent;
  additionalDescription?: RichContent;
  textSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
  titleGridColumn?: object;
  textIndentation?: string | object;
  textGridColumn?: string | Record<string, string>;
}>;

const createParagraph = (paragraphSx?: SxProps<Theme>) => {
  const ParagraphRenderer = (children: React.ReactNode) => {
    const merged = Array.isArray(paragraphSx) ? paragraphSx : [paragraphSx ?? {}];
    return <Typography sx={[{ display: 'block' }, ...merged]}>{children}</Typography>;
  };
  ParagraphRenderer.displayName = 'ParagraphRenderer';
  return ParagraphRenderer;
};

const createListParagraph = (paragraphSx?: SxProps<Theme>) => {
  const ParagraphRenderer = (children: React.ReactNode) => {
    const merged = Array.isArray(paragraphSx) ? paragraphSx : [paragraphSx ?? {}];
    return <ListItem sx={[styles.textContent, ...merged]} text={children as string} />;
  };
  ParagraphRenderer.displayName = 'ListParagraphRenderer';
  return ParagraphRenderer;
};

function renderTextBlock(
  data?: RichContent,
  textSx?: SxProps<Theme>,
  textIndentation?: string | object,
  textGridColumn?: string | Record<string, string>
) {
  if (!data) return null;

  const indent = textIndentation ?? ((textSx && (textSx as any)?.textIndent) as string) ?? '0px';
  const gridOverride = textGridColumn ? { gridColumn: textGridColumn } : {};

  if (typeof data === 'string') {
    return (
      <Typography
        sx={[textStyles.blockDescription, styles.textContent(indent), gridOverride, ...(sxToArray(textSx) as any[])]}
      >
        {data}
      </Typography>
    );
  }

  if (Array.isArray(data)) {
    return data.map(({ id, text }) => (
      <Typography
        key={id}
        sx={[textStyles.blockDescription, styles.textContent(indent), gridOverride, ...(sxToArray(textSx) as any[])]}
      >
        {text}
      </Typography>
    ));
  }

  return (
    <TipTapContent
      data={data}
      nodeRenderers={{
        paragraph: createParagraph([
          textStyles.blockDescription,
          styles.textContent(indent),
          ...(textGridColumn ? [{ gridColumn: textGridColumn }] : []),
          ...(sxToArray(textSx) as any[])
        ])
      }}
    />
  );
}

function renderList(data?: RichContent, textSx?: SxProps<Theme>) {
  if (!data) return null;

  if (typeof data === 'string') {
    return <ListItem sx={[styles.textContent, ...(sxToArray(textSx) as any[]), { maxWidth: '900px' }]} text={data} />;
  }

  if (Array.isArray(data)) {
    return data.map(({ id, text }) => (
      <ListItem key={id} sx={[styles.textContent, ...(sxToArray(textSx) as any[])]} text={text} />
    ));
  }

  return (
    <TipTapContent
      data={data}
      nodeRenderers={{
        paragraph: createListParagraph([styles.textContent, ...(sxToArray(textSx) as any[]), { maxWidth: '900px' }])
      }}
    />
  );
}

export default function ContentBlock({
  title,
  description,
  list,
  additionalDescription,
  textSx,
  containerSx,
  titleGridColumn,
  textIndentation,
  textGridColumn
}: ContentBlockProps) {
  return (
    <Box sx={{ ...styles.container, ...containerSx }}>
      {title && (
        <SectionTitle
          icon={true}
          title={title}
          mb={0}
          gridColumn={titleGridColumn ?? { xs: '2 / -1', sm: '4 / -1', md: '6 / -1' }}
        />
      )}
      {renderTextBlock(description, textSx, textIndentation, textGridColumn)}
      {renderList(list, textSx)}
      {renderTextBlock(additionalDescription, textSx, textIndentation, textGridColumn)}
    </Box>
  );
}
