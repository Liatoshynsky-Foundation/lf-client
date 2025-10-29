import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import type { Partner } from '../partners.data';
import styles from './PartnerGrid.styles';

import PartnerLogo from '~/shared/components/partner-logo/PartnerLogo';

interface PartnerGridProps {
  layout: (string | null)[];
  columns: number;
  partners: Partner[];
}

const PartnerGrid = ({ layout, columns, partners }: PartnerGridProps) => {
  const layoutWithKeys = layout.map((id) => ({
    id,
    key: id ?? uuidv4()
  }));

  return (
    <Box sx={styles.grid(columns)}>
      {layoutWithKeys.map(({ id, key }) => {
        if (!id) return <Box key={key} />;

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
};

export default PartnerGrid;
