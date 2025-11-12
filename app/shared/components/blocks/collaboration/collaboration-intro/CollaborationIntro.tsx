import { Box, Typography } from '@mui/material';

import { styles } from './CollaborationIntro.styles';
import { TipTapDoc } from '~/types/types/common.types';

import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';

interface CollaborationIntroProps {
  readonly title: string;
  readonly subtitle: string;
  readonly content: TipTapDoc;
  readonly contentAbove: TipTapDoc;
}

export default function CollaborationIntro({ title, subtitle, content, contentAbove }: CollaborationIntroProps) {
  return (
    <Box sx={styles.container}>
      <Typography variant="h2" sx={styles.title}>
        {title}
      </Typography>
      <Box sx={styles.textContainer}>
        <Typography sx={styles.subtitle}>{subtitle}</Typography>
        <ContentBlock description={contentAbove} textSx={styles.textAbove} />
        <ContentBlock description={content} textSx={styles.text} />
      </Box>
    </Box>
  );
}
