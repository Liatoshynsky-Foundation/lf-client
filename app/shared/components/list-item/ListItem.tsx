'use client';

import { Box, SxProps, Theme, Typography } from '@mui/material';

import { SvgImage } from '../svg-image/SvgImage';
import { styles } from './ListItem.styles';

interface ListItemProps {
  text: string | React.ReactNode;
  sx?: SxProps<Theme>;
}

const ListItem: React.FC<ListItemProps> = ({ text, sx }) => {
  return (
    <Box sx={[styles.listItem, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box sx={styles.bulletIcon}>
        <Box sx={styles.bulletMobile} aria-hidden={true}>
          <SvgImage src="/icons/bullet-small.svg" alt="" width={12} height={12} />
        </Box>
        <Box sx={styles.bulletDesktop} aria-hidden={true}>
          <SvgImage src="/icons/bullet-small.svg" alt="" width={16} height={16} />
        </Box>
      </Box>
      <Typography sx={styles.typography} component="div">
        {text}
      </Typography>
    </Box>
  );
};

export default ListItem;
