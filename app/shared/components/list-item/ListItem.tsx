import { Box, Typography } from '@mui/material';

import { SvgImage } from '../svg-image/SvgImage';
import { styles } from './ListItem.styles';

interface ListItemProps {
  text: string | React.ReactNode;
  sx?: object;
}

const ListItem: React.FC<ListItemProps> = ({ text, sx }) => {
  return (
    <Box sx={{ ...styles.listItem, ...sx }}>
      <Box sx={styles.bulletIcon}>
        <SvgImage src="/icons/bullet-small.svg" alt="bullet" width={16} height={16} />
      </Box>
      <Box sx={styles.typography}>
        {typeof text === 'string' ? <Typography component="p">{text}</Typography> : text}
      </Box>
    </Box>
  );
};

export default ListItem;
