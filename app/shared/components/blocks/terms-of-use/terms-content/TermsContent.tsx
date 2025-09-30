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
    <Box sx={{ gridTemplateColumns: 'subgrid', gridColumn: '1/-1', mb: '40px' }}>
      <ContentBlock
        title={t('libraryAccessTitle')}
        containerSx={{
          marginBottom: '16px'
        }}
      />
      <ButtonContentBlock
        buttonText={isMobile ? t('buttons.library.short') : t('buttons.library.full')}
        buttonColor="tertiary"
        content={testDoc[locale]}
        sx={{ maxWidth: { xs: '258px', sm: '308px' }, minWidth: { xs: '258px', sm: '308px' } }}
      />

      <ButtonContentBlock
        buttonText={isMobile ? t('buttons.archive.short') : t('buttons.archive.full')}
        buttonColor="tertiary"
        content={archiveDoc[locale]}
        sx={{
          maxWidth: { xs: '220px', sm: '289px' },
          minWidth: { xs: '220px', sm: '289px' },
          right: { sm: '16px', md: 0 }
        }}
      />

      <ContentBlock
        description={t('archiveUsage')}
        containerSx={{ marginBottom: { xs: '80px', sm: '104px', md: '128px', lg: '144px' } }}
      />
      <Box
        sx={{
          height: { xs: '157px', sm: '250px', md: '340px', lg: '440px', xl: '470px', xxl: '567px', ultra: '626px' },
          mb: { xs: '80px', sm: '104px', md: '128px', lg: '144px' }
        }}
      >
        <SkewedBlock
          isBackground
          image="/images/retro-collage.jpg"
          backgroundSize="cover"
          height={{ xs: '90%', sm: '100%' }}
        />
      </Box>
      <ContentBlock title={t('copyrightTitle')} containerSx={{ marginBottom: '16px' }} />
      <ContentBlock description={rightsDoc[locale]} containerSx={{ marginBottom: '32px' }} />
      <ContentBlock description={rightsManagementDoc[locale]} containerSx={{ marginBottom: '32px' }} />
      <ContentBlock description={meaningDoc[locale]} containerSx={{ marginBottom: '32px' }} />
      <ContentBlock list={licenseDoc[locale]} containerSx={{ marginBottom: '32px' }} />
      <ContentBlock description={t('paidNotes')} containerSx={{ marginBottom: '32px' }} />
      <ContentBlock containerSx={{ marginBottom: { xs: '80px', sm: '104px', md: '128px', lg: '144px' } }} />
      <ContentBlock title={t('registerTitle')} containerSx={{ marginBottom: '16px' }} />
      <ContentBlock description={registerDoc[locale]} containerSx={{ marginBottom: '32px' }} />

      {registerListKeys.map((key, i) => (
        <ContentBlock
          key={`${i}-${key}`}
          list={t(key)}
          containerSx={{
            mb: i === registerListKeys.length - 1 ? { xs: '32px' } : { xs: '24px', md: '32px' }
          }}
        />
      ))}

      <ContentBlock
        description={privacyDoc[locale]}
        containerSx={{ marginBottom: { xs: '80px', sm: '104px', md: '128px', lg: '144px' } }}
      />
      <ContentBlock title={t('behaviorTitle')} containerSx={{ marginBottom: '16px' }} />
      <ContentBlock description={t('behaviorIntro')} containerSx={{ marginBottom: '32px' }} />

      <Box>
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
          />
        ))}
      </Box>
      <ContentBlock title={t('supportTitle')} containerSx={{ marginBottom: '16px' }} />
      <ContentBlock
        description={supportDoc[locale]}
        containerSx={{ marginBottom: { xs: '80px', sm: '104px', md: '128px', lg: '144px' } }}
      />
      <ContentBlock title={t('respectAuthorsTitle')} containerSx={{ marginBottom: '16px' }} />
      <ContentBlock description={t('respectAuthorsIntro')} containerSx={{ marginBottom: '16px' }} />
      <ContentBlock
        description={t('respectAuthorsOutro')}
        containerSx={{ marginBottom: { xs: '120px', md: '160px' } }}
      />
    </Box>
  );
};

export default TermsContent;
