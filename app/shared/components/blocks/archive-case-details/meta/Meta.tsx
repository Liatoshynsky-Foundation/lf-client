import { Box, Typography } from '@mui/material';

import { styles } from './Meta.styles';

export type MetaLabels = {
  code: string;
  dates: string;
  sheets: string;
};

export type MetaProps = {
  index: string;
  dateRange: string;
  sheetsCount?: number;
  labels: MetaLabels;
};

const Meta = ({ index, dateRange, sheetsCount, labels }: Readonly<MetaProps>) => {
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

      {sheetsCount !== undefined && (
        <Box sx={styles.metaBlock}>
          <Typography sx={styles.metaLabel}>{labels.sheets}</Typography>
          <Typography sx={styles.metaValue}>{sheetsCount}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Meta;
