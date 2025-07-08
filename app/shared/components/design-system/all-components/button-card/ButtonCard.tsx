import { Box, Typography } from '@mui/material';

import { styles } from './ButtonCard.styles';

import { Link } from '~/i18n/navigation';

interface ButtonCardProps {
  text: string;
  link?: string;
}

const ButtonCard = ({ text, link }: ButtonCardProps) => {
  const cardContent = (
    <Box sx={styles.container}>
      <Box sx={styles.background} className="background" />
      <Box sx={styles.content}>
        <Typography variant="customBold20">{text}</Typography>
      </Box>
    </Box>
  );

  return link ? <Link href={link}>{cardContent}</Link> : cardContent;
};

export default ButtonCard;
