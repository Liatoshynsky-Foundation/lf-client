import { Box, TableCell, TableRow, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './TableNoResultsFound.styles';

export default function TableNoResultsFound() {
  const t = useTranslations('table.composition.notFound');
  return (
    <TableRow data-testid="TableNoResultsFound">
      <TableCell colSpan={1} sx={{ borderBottom: 0 }}>
        <Box sx={styles.container} data-testid="TableNoResultsFound-container">
          <Box sx={styles.image} data-testid="TableNoResultsFound-image">
            <Image src="/images/cat-no-results-found.svg" alt="No results found" fill />
          </Box>
          <Typography variant="h4" sx={styles.h4} fontWeight="bold" data-testid="TableNoResultsFound-title">
            {t('title')}
          </Typography>
          <Typography sx={styles.description} color="text.secondary" data-testid="TableNoResultsFound-description">
            {t('description')}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}
