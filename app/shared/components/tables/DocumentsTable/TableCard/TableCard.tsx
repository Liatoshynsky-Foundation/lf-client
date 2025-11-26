import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { styles } from './TableCard.styles';
import { IconButtonColorVariant } from '~/types/enums/common.enums';

import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import { ArchiveRecord } from '~/shared/components/tables/DocumentsTable/documents.conts';

export default function TableCard({ id, code, name, date, sheets, content }: Readonly<ArchiveRecord>) {
  const t = useTranslations('table.documents');
  return (
    <Box key={id} sx={styles.card}>
      <Box sx={styles.contentBox}>
        <Box>
          <Typography sx={styles.code}>{code}</Typography>
          <Typography sx={styles.name}>{name}</Typography>
        </Box>
        <Box>
          <Box sx={{ mb: '4px' }}>
            <Typography sx={styles.label} component="span">
              {t('columns.date') + ': '}:
            </Typography>{' '}
            <Typography sx={styles.labelValue} component="span">
              {date}
            </Typography>
          </Box>
          <Box>
            <Typography sx={styles.label} component="span">
              {t('columns.sheets') + ': '}
            </Typography>{' '}
            <Typography sx={styles.labelValue} component="span">
              {sheets}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography sx={styles.content}>{content}</Typography>
        </Box>
      </Box>
      <Box sx={styles.buttonsBox}>
        <Button variant="outlined" size="medium" color="primary">
          {t('buttons.mobileView')}
        </Button>
        <IconButton size="small" variant={IconButtonColorVariant.Secondary} sx={{ bgcolor: 'none' }}>
          <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
        </IconButton>
      </Box>
    </Box>
  );
}
