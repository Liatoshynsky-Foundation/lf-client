import { Box } from '@mui/material';

import type { Partner } from '../partners.const';
import styles from './PartnerGrid.styles';

import PartnerLogo from '~/shared/components/partner-logo/PartnerLogo';

interface PartnerGridProps {
  layout: (string | null)[];
  columns: number;
  rows: number;
  partners: Partner[];
}

const PartnerGrid = ({ layout, columns, partners }: PartnerGridProps) => (
  <Box sx={styles.grid(columns)}>
    {layout.map((id, i) => {
      if (!id) return <Box key={`empty-${i}`} />;

      const partner = partners.find((p) => p.id === id);
      if (!partner) return <Box key={`missing-${id}`} />;

      return (
        <Box key={id} sx={styles.logoBox}>
          <PartnerLogo
            link={partner.link}
            image={<img src={partner.img} alt={partner.name} style={styles.img as React.CSSProperties} />}
          />
        </Box>
      );
    })}
  </Box>
);

export default PartnerGrid;
