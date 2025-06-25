import { Box, Typography } from '@mui/material';

import { styles } from './TextCard.styles';

interface TextCardProps {
  title: string;
  description: string;
}

const TextCard: React.FC<TextCardProps> = ({ title, description }) => {
  return (
    <Box sx={styles.card}>
      <Box sx={styles.content}>
        <Typography sx={styles.description}>{description}</Typography>

        <Typography sx={styles.title}>{title}</Typography>
      </Box>
    </Box>
  );
};

export default TextCard;
