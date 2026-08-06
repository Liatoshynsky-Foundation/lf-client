import { Box, Typography } from '@mui/material';

import { styles } from './FormError.styles';

export interface FormErrorProps {
  errorMessage: string | null;
}

export default function FormError({ errorMessage }: Readonly<FormErrorProps>) {
  return (
    <Box sx={styles.container} data-testid="form-error-box">
      <Typography color="error" variant="body2" sx={styles.text} data-testid="form-error-text">
        {errorMessage}
      </Typography>
    </Box>
  );
}
