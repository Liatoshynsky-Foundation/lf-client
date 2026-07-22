import { Box, Typography } from '@mui/material';

import ContentBlock from '../content-block/ContentBlock';
import { styles } from './TitleContentBlock.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

type RichContent = string | TipTapDoc;

type TitleContentBlockProps = {
  title: string;
  content: RichContent;
  containerSx?: object;
};

export default function TitleContentBlock({ title, content, containerSx }: Readonly<TitleContentBlockProps>) {
  return (
    <Box data-testid="TitleContentBlock" sx={{ ...styles.mainContainer, ...containerSx }}>
      <Typography data-testid="TitleContentBlock-title" sx={styles.title} variant="h5" component="h3">
        {title}
      </Typography>
      <Box sx={styles.contentBlock}>
        <ContentBlock dataTestId="TitleContentBlock-contentBlock" textSx={styles.textStyle} description={content} />
      </Box>
    </Box>
  );
}
