import { Box } from '@mui/material';

import { PartnerKey, partners } from '../partners.const';
import styles from './PartnerGrid.styles';

import PartnerLogo from '~/shared/components/partner-logo/PartnerLogo';

interface PartnerGridProps {
  layout: (PartnerKey | null)[];
  columns: number;
  rows: number;
}

const PartnerGrid = ({ layout, columns, rows }: PartnerGridProps) => (
  <Box sx={styles.grid(columns, rows)}>
    {layout.map((key, i) =>
      key ? (
        <Box key={key} sx={styles.logoBox}>
          <PartnerLogo
            link={partners[key].link}
            image={<img src={partners[key].img} alt={partners[key].name} style={styles.img as React.CSSProperties} />}
          />
        </Box>
      ) : (
        <Box key={`empty-${i}`} />
      )
    )}
  </Box>
);

export default PartnerGrid;
