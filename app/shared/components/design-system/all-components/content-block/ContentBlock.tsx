import { Theme } from '@emotion/react';
import { Box, SxProps, Typography } from '@mui/material';

import { styles } from './ContentBlock.styles';
import type { TipTapDoc } from '~/types/types/common.types';

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
  'data-testid'?: string;
}>;

const createParagraph = (paragraphSx?: SxProps<Theme>) => {
  const ParagraphRenderer = (children: React.ReactNode) => (
    <Typography sx={{ display: 'block', ...paragraphSx }}>{children}</Typography>
  );
  ParagraphRenderer.displayName = 'ParagraphRenderer';
  return ParagraphRenderer;
};

const createListParagraph = (paragraphSx?: SxProps<Theme>) => {
  const ParagraphRenderer = (children: React.ReactNode) => (
    <ListItem sx={{ ...styles.textContent, ...paragraphSx }} text={children as string} />
  );
  ParagraphRenderer.displayName = 'ListParagraphRenderer';
  return ParagraphRenderer;
};

function renderTextBlock(data?: RichContent, textSx?: SxProps<Theme>) {
  if (!data) return null;

  if (typeof data === 'string') {
    return <Typography sx={{ ...textStyles.blockDescription, ...styles.textContent, ...textSx }}>{data}</Typography>;
  }

  if (Array.isArray(data)) {
    return data.map(({ id, text }) => (
      <Typography key={id} sx={{ ...textStyles.blockDescription, ...styles.textContent, ...textSx }}>
        {text}
      </Typography>
    ));
  }

  return (
    <TipTapContent
      data={data}
      nodeRenderers={{
        paragraph: createParagraph({
          ...textStyles.blockDescription,
          ...styles.textContent,
          ...textSx
        })
      }}
    />
  );
}

function renderList(data?: RichContent, textSx?: SxProps<Theme>) {
  if (!data) return null;

  if (typeof data === 'string') {
    return <ListItem sx={{ ...styles.textContent, ...textSx, maxWidth: '900px' }} text={data} />;
  }

  if (Array.isArray(data)) {
    return data.map(({ id, text }) => <ListItem key={id} sx={{ ...styles.textContent, ...textSx }} text={text} />);
  }

  return (
    <TipTapContent
      data={data}
      nodeRenderers={{
        paragraph: createListParagraph({
          ...styles.textContent,
          ...textSx,
          maxWidth: '900px'
        })
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
  'data-testid': dataTestId
}: ContentBlockProps) {
  return (
    <Box sx={{ ...styles.container, ...containerSx }} data-testid={dataTestId}>
      {title && <SectionTitle icon={true} title={title} mb={0} gridColumn={{ xs: '2/ -1', sm: '4/ -1', md: '6/-1' }} />}
      {renderTextBlock(description, textSx)}
      {renderList(list, textSx)}
      {renderTextBlock(additionalDescription, textSx)}
    </Box>
  );
}
