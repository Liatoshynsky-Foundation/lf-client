import { Box, SxProps, Theme, Typography } from '@mui/material';

import { styles } from './TextCard.styles';
import type { StringOrLocalizedString } from '~/types/types/language';

import { sxToArray } from '~/lib/utils/sxToArray';

interface TextCardProps {
  title: StringOrLocalizedString;
  description: StringOrLocalizedString;
  sx?: SxProps<Theme>;
  locale?: 'en' | 'uk';
}

const TextCard: React.FC<TextCardProps> = ({ title, description, sx, locale = 'en' }) => {
  return (
    <Box sx={[styles.card, ...sxToArray(sx)]}>
      <Box sx={styles.background} />
      <Box sx={styles.content}>
        <Typography sx={styles.description}>
          {typeof description === 'string' ? description : description[locale]}
        </Typography>

        <Typography sx={styles.title}>{typeof title === 'string' ? title : title[locale]}</Typography>
      </Box>
    </Box>
  );
};

export default TextCard;
