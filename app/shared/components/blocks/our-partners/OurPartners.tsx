import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

import ContentBlock from '~/ds-components/content-block/ContentBlock';

import PartnerLogo from '../../partner-logo/PartnerLogo';
import SectionTitle from '../../section-title/SectionTitle';
import { styles } from './OurPartners.styles';
import PartnerGrid from './partner-grid/PartnerGrid';
import { generateLayouts, gridConfigs, patterns } from './partnerLayouts';
import { partnersMock } from './partners.data';

export default function OurPartners() {
  const t = useTranslations('warSupport.ourPartners');

  const partners = partnersMock;

  const layouts = generateLayouts(partners, patterns);

  return (
    <Box sx={styles.wrapper}>
      <SectionTitle
        icon={true}
        title={t('title')}
        gridColumn={{ xs: '1/ -1', sm: '4/ -1', md: '6/-1' }}
        sx={styles.titleContainer}
        mb={43}
      />
      <ContentBlock textSx={styles.text} description={t('description')} />

      <Box sx={styles.xsGrid}>
        {partners.map((partner) => (
          <Box key={partner.id} sx={styles.logoWrapper}>
            <PartnerLogo
              link={partner.link}
              image={<img src={partner.img} alt={partner.name} style={styles.logoImage as React.CSSProperties} />}
            />
          </Box>
        ))}
      </Box>

      {gridConfigs.map(({ key, min, max, columns }) => (
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
          <PartnerGrid layout={layouts[key] ?? []} columns={columns} partners={partners} />
        </Box>
      ))}
    </Box>
  );
}
