import { Box, SxProps, Theme, Typography } from '@mui/material';

import { styles } from './TextCard.styles';

import { sxToArray } from '~/lib/utils/sxToArray';

interface TextCardProps {
  title: string;
  description: string;
  sx?: SxProps<Theme>;
}

const TextCard: React.FC<TextCardProps> = ({ title, description, sx }) => {
  return (
    <Box sx={[styles.card, ...sxToArray(sx)]}>
      <Box sx={styles.background} />
      <Box sx={styles.content}>
        <Typography sx={styles.description}>{description}</Typography>

        <Typography sx={styles.title}>{title}</Typography>
      </Box>
    </Box>
  );
};

export default TextCard;
