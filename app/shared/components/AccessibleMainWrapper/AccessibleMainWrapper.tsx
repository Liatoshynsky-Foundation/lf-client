import { Box, type BoxProps } from '@mui/material';

export const AccessibleMainWrapper = ({ children, ...props }: BoxProps) => {
  return (
    <Box component="main" id="main" tabIndex={-1} {...props}>
      {children}
    </Box>
  );
};
