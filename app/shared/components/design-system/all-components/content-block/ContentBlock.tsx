import { Box, Typography } from '@mui/material';

import { styles } from './ContentBlock.styles';

import ListItem from '~/shared/components/list-item/ListItem';
import SectionTitle from '~/shared/components/section-title/SectionTitle';
import { Typography as textStyles } from '~/shared/components/title-with-description/TitleWithDescription.styles';

type Paragraph = Readonly<{
  id: number;
  text: string;
}>;

type ContentBlockProps = Readonly<{
  title?: string;
  description?: string | Paragraph[];
  list?: string | Paragraph[];
  additionalDescription?: string | Paragraph[];
}>;

function renderTextBlock(data?: string | Paragraph[]) {
  if (!data) return null;

  return Array.isArray(data) ? (
    data.map(({ id, text }) => (
      <Typography key={id} sx={{ ...textStyles.blockDescription, ...styles.textContent }}>
        {text}
      </Typography>
    ))
  ) : (
    <Typography sx={{ ...textStyles.blockDescription, ...styles.textContent }}>{data}</Typography>
  );
}

function renderList(data?: string | Paragraph[]) {
  if (!data) return null;

  return Array.isArray(data) ? (
    data.map(({ id, text }) => <ListItem key={id} sx={styles.textContent} text={text} />)
  ) : (
    <ListItem sx={styles.textContent} text={data} />
  );
}

export default function ContentBlock({ title, description, list, additionalDescription }: ContentBlockProps) {
  return (
    <Box sx={styles.container}>
      {title && <SectionTitle icon={true} title={title} mb={0} />}
      {renderTextBlock(description)}
      {renderList(list)}
      {renderTextBlock(additionalDescription)}
    </Box>
  );
}
