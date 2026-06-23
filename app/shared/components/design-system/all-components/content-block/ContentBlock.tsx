import { Box, SxProps, Theme, Typography } from '@mui/material';

import { styles } from './ContentBlock.styles';
import type { TipTapDoc } from '~/types/types/tiptap.types';

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
  additionalTextSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
  dataTestId?: string;
}>;

const createParagraph = (paragraphSx?: SxProps<Theme>) => {
  const ParagraphRenderer = (children: React.ReactNode) => (
    <Typography sx={[{ display: 'block' }, ...(Array.isArray(paragraphSx) ? paragraphSx : [paragraphSx])]}>
      {children}
    </Typography>
  );
  ParagraphRenderer.displayName = 'ParagraphRenderer';
  return ParagraphRenderer;
};

const createListParagraph = (paragraphSx?: SxProps<Theme>) => {
  const ParagraphRenderer = (children: React.ReactNode) => <ListItem sx={paragraphSx} text={children as string} />;
  ParagraphRenderer.displayName = 'ListParagraphRenderer';
  return ParagraphRenderer;
};

function renderTextBlock(data?: RichContent, textSx?: SxProps<Theme>) {
  if (!data) return null;

  const combinedSx: SxProps<Theme> = [
    textStyles.blockDescription,
    styles.textContent,
    ...(Array.isArray(textSx) ? textSx : [textSx])
  ];

  if (typeof data === 'string') {
    return <Typography sx={combinedSx}>{data}</Typography>;
  }

  if (Array.isArray(data)) {
    return data.map(({ id, text }) => (
      <Typography key={id} sx={combinedSx}>
        {text}
      </Typography>
    ));
  }

  return (
    <TipTapContent
      data={data}
      nodeRenderers={{
        paragraph: createParagraph(combinedSx)
      }}
    />
  );
}

function renderList(data?: RichContent, textSx?: SxProps<Theme>) {
  if (!data) return null;

  const flatTextSx = Array.isArray(textSx) ? textSx : [textSx];

  if (typeof data === 'string') {
    return <ListItem sx={[styles.textContent, ...flatTextSx, { maxWidth: '900px' }]} text={data} />;
  }

  if (Array.isArray(data)) {
    return data.map(({ id, text }) => <ListItem key={id} sx={[styles.textContent, ...flatTextSx]} text={text} />);
  }

  return (
    <TipTapContent
      data={data}
      nodeRenderers={{
        paragraph: createListParagraph([styles.textContent, ...flatTextSx, { maxWidth: '900px' }])
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
  additionalTextSx,
  containerSx,
  dataTestId
}: ContentBlockProps) {
  return (
    <Box
      sx={[styles.container, ...(Array.isArray(containerSx) ? containerSx : [containerSx])]}
      data-testid={dataTestId}
    >
      {title && <SectionTitle icon={true} title={title} mb={0} gridColumn={{ xs: '2/ -1', sm: '4/ -1', md: '6/-1' }} />}
      {renderTextBlock(description, textSx)}
      {renderList(list, textSx)}
      {renderTextBlock(additionalDescription, additionalTextSx || textSx)}
    </Box>
  );
}
