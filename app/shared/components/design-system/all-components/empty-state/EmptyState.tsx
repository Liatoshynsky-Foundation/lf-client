import { Box, Typography } from '@mui/material';

import { styles } from './EmptyState.styles';

interface EmptyStateProps {
  title: string;
  description?: string;
  dataTestId?: string;
}

const EmptyState = ({ title, description, dataTestId = 'EmptyState' }: EmptyStateProps) => {
  return (
    <Box data-testid={dataTestId} sx={styles.container} role="status" aria-live="polite">
      <Typography variant="h3" sx={styles.title} data-testid={`${dataTestId}-title`}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" sx={styles.description} data-testid={`${dataTestId}-description`}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default EmptyState;
