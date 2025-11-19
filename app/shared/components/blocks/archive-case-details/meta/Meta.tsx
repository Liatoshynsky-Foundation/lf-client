import { Box, Typography } from '@mui/material';

import PdfButton from '../pdf-button/PdfButton';
import { styles } from './Meta.styles';

export type MetaLabels = {
  code: string;
  dates: string;
  sheets: string;
  viewPdf: string;
};

export type MetaProps = {
  index: string;
  dateRange: string;
  sheetsCount?: number;
  pdfUrl: string;
  labels: MetaLabels;
};

const Meta = ({ index, dateRange, sheetsCount, pdfUrl, labels }: Readonly<MetaProps>) => {
  return (
    <Box sx={styles.root} data-testid="ArchiveCaseDetails-meta">
      <Box sx={styles.metaBlock}>
        <Typography sx={styles.metaLabel}>{labels.code}</Typography>
        <Typography sx={styles.metaValue}>{index}</Typography>
      </Box>

      <Box sx={styles.metaBlock}>
        <Typography sx={styles.metaLabel}>{labels.dates}</Typography>
        <Typography sx={styles.metaValue}>{dateRange}</Typography>
      </Box>

      {typeof sheetsCount === 'number' && (
        <Box sx={styles.metaBlock}>
          <Typography sx={styles.metaLabel}>{labels.sheets}</Typography>
          <Typography sx={styles.metaValue}>{sheetsCount}</Typography>
        </Box>
      )}

      <Box sx={styles.pdfButtonWrapper} data-testid="ArchiveCaseDetails-pdfButtonSticky">
        <PdfButton href={pdfUrl} label={labels.viewPdf} dataTestId="ArchiveCaseDetails-pdfButton" />
      </Box>
    </Box>
  );
};

export default Meta;
