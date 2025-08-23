
import { Box, Paper, PaperProps, SxProps, Theme } from '@mui/material';

import { styles } from './PaperComponent.styles';
import { sxToArray } from '~/lib/utils/sxToArray';

interface PaperComponentProps extends PaperProps {
  childrenSx?: SxProps<Theme>;
}

export default function PaperComponent({ elevation = 0, children, sx, childrenSx, ...props }: PaperComponentProps) {
  return (
    <Paper elevation={elevation} sx={[styles.container, ...sxToArray(sx)]} {...props}>
      <Box sx={[styles.children, ...sxToArray(childrenSx)]}>{children}</Box>
    </Paper>
  );
}
