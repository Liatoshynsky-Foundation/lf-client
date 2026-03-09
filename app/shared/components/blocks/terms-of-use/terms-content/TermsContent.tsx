'use client';
import { Box } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

import {
  archiveDoc,
  behaviorListKeys,
  licenseDoc,
  meaningDoc,
  privacyDoc,
  registerDoc,
  registerListKeys,
  rightsDoc,
  rightsManagementDoc,
  supportDoc,
  testDoc
} from '../terms.const.';
import ButtonContentBlock from './button-content-block/ButtonContentBlock';

import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';
import { SkewedBlock } from '~/shared/components/design-system/all-components/skewed-block/SkewedBlock';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

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
        link={'/artistry'}
        content={testDoc[locale]}
        containerSx={{ marginBottom: { xs: '32px', md: '40px' } }}
        sx={{ maxWidth: { xs: '258px', sm: '308px' }, minWidth: { xs: '258px', sm: '308px' } }}
      />

      <ButtonContentBlock
        buttonText={isMobile ? t('buttons.archive.short') : t('buttons.archive.full')}
        buttonColor="tertiary"
        link={'/archive'}
        content={archiveDoc[locale]}
        containerSx={{ marginBottom: { xs: '32px', md: '40px' } }}
        sx={{
          maxWidth: { xs: '220px', sm: '289px' },
          minWidth: { xs: '220px', sm: '289px' }
        }}
      />

      <ContentBlock
        description={t('archiveUsage')}
        containerSx={{ marginBottom: { xs: '80px', sm: '104px', md: '128px', lg: '144px' } }}
        dataTestId="TermsContent-archiveUsageDescription"
      />
      <Box
        sx={{
          height: { xs: '157px', sm: '250px', md: '340px', lg: '440px', xl: '470px', xxl: '567px', ultra: '626px' },
          mb: { xs: '80px', sm: '104px', md: '128px', lg: '144px' }
        }}
        data-testid="TermsContent-imageBlock"
      >
        <SkewedBlock
          image="/images/retro-collage.jpg"
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
        description={rightsDoc[locale]}
        containerSx={{ marginBottom: '32px' }}
        dataTestId="TermsContent-copyrightRightsDescription"
      />
      <ContentBlock
        description={rightsManagementDoc[locale]}
        containerSx={{ marginBottom: '32px' }}
        dataTestId="TermsContent-copyrightManagementDescription"
      />
      <ContentBlock
        description={meaningDoc[locale]}
        containerSx={{ marginBottom: '32px' }}
        dataTestId="TermsContent-copyrightMeaningDescription"
      />
      <ContentBlock
        list={licenseDoc[locale]}
        containerSx={{ marginBottom: '32px' }}
        dataTestId="TermsContent-copyrightLicenseList"
      />
      <ContentBlock
        description={t('paidNotes')}
        containerSx={{ marginBottom: '32px' }}
        dataTestId="TermsContent-copyrightPaidNotesDescription"
      />
      <ContentBlock containerSx={{ marginBottom: { xs: '80px', sm: '104px', md: '128px', lg: '144px' } }} />
      <ContentBlock
        title={t('registerTitle')}
        containerSx={{ marginBottom: '16px' }}
        dataTestId="TermsContent-registerTitle"
      />
      <ContentBlock
        description={registerDoc[locale]}
        containerSx={{ marginBottom: '32px' }}
        dataTestId="TermsContent-registerDescription"
      />

      {registerListKeys.map((key, i) => (
        <ContentBlock
          key={`${i}-${key}`}
          list={t(key)}
          containerSx={{
            mb: i === registerListKeys.length - 1 ? { xs: '32px' } : { xs: '24px', md: '32px' }
          }}
          dataTestId={`TermsContent-registerList-${key}`}
        />
      ))}

      <ContentBlock
        description={privacyDoc[locale]}
        containerSx={{ marginBottom: { xs: '80px', sm: '104px', md: '128px', lg: '144px' } }}
        dataTestId="TermsContent-registerPrivacyDescription"
      />
      <ContentBlock
        title={t('behaviorTitle')}
        containerSx={{ marginBottom: '16px' }}
        dataTestId="TermsContent-behaviorTitle"
      />
      <ContentBlock
        description={t('behaviorIntro')}
        containerSx={{ marginBottom: '32px' }}
        dataTestId="TermsContent-behaviorIntroDescription"
      />

      <Box data-testid="TermsContent-behaviorRules">
        {behaviorListKeys.map((key, i) => (
          <ContentBlock
            key={`${i}-${key}`}
            list={t(key)}
            containerSx={{
              mb:
                i === behaviorListKeys.length - 1
                  ? { xs: '80px', sm: '104px', md: '128px', lg: '144px' }
                  : { xs: '24px', md: '32px' }
            }}
            dataTestId={`TermsContent-behaviorList-${key}`}
          />
        ))}
      </Box>
      <ContentBlock
        title={t('supportTitle')}
        containerSx={{ marginBottom: '16px' }}
        dataTestId="TermsContent-supportTitle"
      />
      <ContentBlock
        description={supportDoc[locale]}
        containerSx={{ marginBottom: { xs: '80px', sm: '104px', md: '128px', lg: '144px' } }}
        dataTestId="TermsContent-supportDescription"
      />
      <ContentBlock
        title={t('respectAuthorsTitle')}
        containerSx={{ marginBottom: '16px' }}
        dataTestId="TermsContent-respectAuthorsTitle"
      />
      <ContentBlock
        description={t('respectAuthorsIntro')}
        containerSx={{ marginBottom: '16px' }}
        dataTestId="TermsContent-respectAuthorsIntroDescription"
      />
      <ContentBlock
        description={t('respectAuthorsOutro')}
        containerSx={{ pb: { xs: '120px', md: '160px' } }}
        dataTestId="TermsContent-respectAuthorsOutroDescription"
      />
    </Box>
  );
};

export default TermsContent;
