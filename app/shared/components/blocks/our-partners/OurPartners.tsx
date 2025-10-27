import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

import ContentBlock from '../../design-system/all-components/content-block/ContentBlock';
import PartnerLogo from '../../partner-logo/PartnerLogo';
import { styles } from './OurPartners.styles';
import PartnerGrid from './partner-grid/PartnerGrid';
import { gridConfigs, layouts } from './partnerLayouts';
import { partners } from './partners.const';

export default function OurPartners() {
  const t = useTranslations('ourPartners');
  const xsPartners = Object.entries(partners).slice(0, 2);

  return (
    <Box sx={styles.wrapper}>
      <ContentBlock title={t('title')} containerSx={styles.titleContainer} />

      <ContentBlock textSx={styles.text} description={t('description')} />

      <Box sx={styles.xsGrid}>
        {xsPartners.map(([key, partner]) => (
          <Box key={key} sx={styles.logoWrapper}>
            <PartnerLogo
              link={partner.link}
              image={
                <img
                  src={partner.img}
                  alt={partner.name}
                  width={200}
                  height={100}
                  style={styles.logoImage as React.CSSProperties}
                />
              }
            />
          </Box>
        ))}
      </Box>

      {gridConfigs.map(({ key, min, max, columns, rows }) => (
        <Box
          key={key}
          sx={{
            display: {
              xs: 'none',
              [min]: 'block',
              ...(max ? { [max]: 'none' } : {})
            }
          }}
        >
          <PartnerGrid layout={layouts[key]} columns={columns} rows={rows} />
        </Box>
      ))}
    </Box>
  );
}
