import { Box } from '@mui/material';
import { useLocale } from 'next-intl';
import React from 'react';

import SectionTitle from '../../section-title/SectionTitle';
import { Partner } from '../our-partners/partners.data';
import OurPartnersSlider from '../our-partners-slider';
import ButtonContentBlock from '../terms-of-use/terms-content/button-content-block/ButtonContentBlock';
import { styles } from './CooperationSection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

interface Props {
  title: {
    uk: string;
    en: string;
  };
  textContent: {
    uk: TipTapDoc;
    en: TipTapDoc;
  };
  buttonText: {
    uk: string;
    en: string;
  };
  buttonLink: string;
  partners?: Partner[];
}

const CooperationSection: React.FC<Props> = ({ title, textContent, buttonText, buttonLink, partners }) => {
  const locale = useLocale();
  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle
        icon={true}
        title={title[locale]}
        gridColumn={{ xs: '1/ -1', sm: '4/ -1', md: '6/-1' }}
        sx={{
          mb: { xs: '16px' },
          gap: {
            xs: '16px',
            sm: '24px',
            md: '40px'
          },
          '& h2': {
            textTransform: 'none'
          }
        }}
      />
      <ButtonContentBlock
        content={textContent[locale]}
        buttonText={buttonText[locale]}
        buttonColor="tertiary"
        sx={{ maxWidth: { xs: '246px' }, minWidth: { xs: '246px' } }}
        containerSx={{ mb: { xs: '64px', md: '80px' } }}
        textSx={styles.textStyle}
        textContainerSx={{ marginBottom: { xs: '24px', md: '0px' } }}
        buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
        link={buttonLink}
      />

      <OurPartnersSlider partners={partners ?? []} autoScroll={false} autoScrollInterval={3000} />
    </Box>
  );
};

export default CooperationSection;
