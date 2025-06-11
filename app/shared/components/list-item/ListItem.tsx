import { Box, Typography } from '@mui/material';

import { SvgImage } from '../svg-image/SvgImage';
import { styles } from './ListItem.styles';

interface ListItemProps {
  text: string;
}

const ListItem: React.FC<ListItemProps> = ({ text }) => {
  return (
    <Box sx={styles.listItem}>
      <Box sx={styles.bulletIcon}>
        <SvgImage src="/icons/bullet-small.svg" alt="bullet" width={16} height={16} />
      </Box>
      <Typography sx={styles.typography} component="p">
        {text}
      </Typography>
    </Box>
  );
};

export default ListItem;
