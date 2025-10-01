'use client';

import { Box, Typography } from '@mui/material';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import { SvgImage } from '../svg-image/SvgImage';
import { styles } from './ListItem.styles';

interface ListItemProps {
  text: string | React.ReactNode;
  sx?: object;
}

const ListItem: React.FC<ListItemProps> = ({ text, sx }) => {
  const { isLaptopAndAbove } = useBreakpoints();

  return (
    <Box sx={{ ...styles.listItem, ...sx }}>
      <Box sx={styles.bulletIcon}>
        <SvgImage
          src="/icons/bullet-small.svg"
          alt="bullet"
          width={isLaptopAndAbove ? 16 : 12}
          height={isLaptopAndAbove ? 16 : 12}
        />
      </Box>
      <Typography sx={styles.typography} component="div">
        {text}
      </Typography>
    </Box>
  );
};

export default ListItem;
