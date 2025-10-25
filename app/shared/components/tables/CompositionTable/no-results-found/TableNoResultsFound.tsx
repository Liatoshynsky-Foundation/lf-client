import { Box, TableCell, TableRow, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './TableNoResultsFound.styles';

export default function TableNoResultsFound() {
  const t = useTranslations('table.composition.notFound');
  return (
    <TableRow>
      <TableCell colSpan={1}>
        <Box sx={styles.container}>
          <Box sx={styles.image}>
            <Image src="/images/cat-no-results-found.svg" alt="No results found" fill />
          </Box>
          <Typography variant="h4" fontWeight="bold">
            {t('title')}
          </Typography>
          <Typography sx={styles.description} variant="subtitle2" color="text.secondary">
            {t('description')}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}
