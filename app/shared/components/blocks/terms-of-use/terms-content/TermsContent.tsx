'use client';
import { Box } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

import { archiveDoc, copyrightDoc, libraryDoc, licenseDoc, rightsManagementDoc, supportDoc } from '../terms.const.';
import ButtonContentBlock from './button-content-block/ButtonContentBlock';

import { ROUTES } from '~/shared/components/constants/routes';
import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';
import { SkewedBlock } from '~/shared/components/design-system/all-components/skewed-block/SkewedBlock';
import { IMAGES } from '~/shared/constants/assets';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { commonSx } from '~/shared/styles/commonSx';

const SECTION_SPACING = { xs: '80px', sm: '104px', md: '128px', lg: '144px' };

const TermsContent = () => {
  const t = useTranslations('termsOfUse');
  const locale = useLocale();
  const { isMobile } = useBreakpoints();
  return (
    <Box sx={{ gridTemplateColumns: 'subgrid', gridColumn: '1/-1', pb: '40px' }} data-testid="TermsContent">
      <ContentBlock
        title={t('libraryAccessTitle')}
        containerSx={{
          marginBottom: '16px'
        }}
        dataTestId="TermsContent-libraryAccessTitle"
      />
      <ButtonContentBlock
        buttonText={isMobile ? t('buttons.library.short') : t('buttons.library.full')}
        buttonColor="tertiary"
        link={ROUTES.ARTISTRY}
        content={libraryDoc[locale]}
        containerSx={{ marginBottom: { xs: '32px', md: '40px' } }}
        sx={{ maxWidth: { xs: '258px', sm: '308px' }, minWidth: { xs: '258px', sm: '308px' } }}
      />

      <ButtonContentBlock
        buttonText={isMobile ? t('buttons.archive.short') : t('buttons.archive.full')}
        buttonColor="tertiary"
        link={ROUTES.ARCHIVE}
        content={archiveDoc[locale]}
        containerSx={{ marginBottom: { xs: '32px', md: '40px' } }}
        sx={{
          maxWidth: { xs: '220px', sm: '289px' },
          minWidth: { xs: '220px', sm: '289px' }
        }}
      />

      <ContentBlock
        description={t('archiveCitation')}
        containerSx={{
          ...commonSx.layout.standardGrid,
          marginBottom: '32px'
        }}
        dataTestId="TermsContent-archiveCitationDescription"
      />
      <ContentBlock
        description={t('archiveReproduction')}
        containerSx={{
          ...commonSx.layout.standardGrid,
          marginBottom: SECTION_SPACING
        }}
        dataTestId="TermsContent-archiveReproductionDescription"
      />
      <Box
        sx={{
          height: { xs: '157px', sm: '250px', md: '340px', lg: '440px', xl: '470px', xxl: '567px', ultra: '626px' },
          mb: SECTION_SPACING
        }}
        data-testid="TermsContent-imageBlock"
      >
        <SkewedBlock
          image={IMAGES.TERMS_RETRO_COLLAGE}
          backgroundSize="cover"
          height={{ xs: '90%', sm: '100%' }}
          isBackground
        />
      </Box>
      <ContentBlock
        title={t('copyrightTitle')}
        containerSx={{ marginBottom: '16px' }}
        dataTestId="TermsContent-copyrightTitle"
      />
      <ContentBlock
        description={copyrightDoc[locale]}
        containerSx={{
          ...commonSx.layout.standardGrid,
          marginBottom: '32px'
        }}
        dataTestId="TermsContent-copyrightDescription"
      />
      <ContentBlock
        description={rightsManagementDoc[locale]}
        containerSx={{
          ...commonSx.layout.standardGrid,
          marginBottom: '32px'
        }}
        dataTestId="TermsContent-copyrightManagementDescription"
      />
      <ContentBlock
        description={licenseDoc[locale]}
        containerSx={{
          ...commonSx.layout.standardGrid,
          marginBottom: SECTION_SPACING
        }}
        dataTestId="TermsContent-copyrightLicenseDescription"
      />
      <ContentBlock
        title={t('materialsUsageTitle')}
        containerSx={{ marginBottom: '16px' }}
        dataTestId="TermsContent-materialsUsageTitle"
      />
      <ContentBlock
        description={t('noRepublishing')}
        containerSx={{
          ...commonSx.layout.standardGrid,
          marginBottom: '32px'
        }}
        dataTestId="TermsContent-noRepublishingDescription"
      />
      <ContentBlock
        description={supportDoc[locale]}
        containerSx={{
          ...commonSx.layout.standardGrid,
          pb: { xs: '120px', md: '160px' }
        }}
        dataTestId="TermsContent-supportDescription"
      />
    </Box>
  );
};

export default TermsContent;
