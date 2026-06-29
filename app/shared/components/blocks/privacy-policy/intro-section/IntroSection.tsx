import { Box, Typography } from '@mui/material';

import { theme } from '~/ds-components/theme/Theme';

import { styles } from './IntroSection.styles';
import type { IntroSectionProps } from '~/types/page/privacy-policy.types';

import { PolicyContent } from '~/shared/components/blocks/privacy-policy/policy-content/PolicyContent';

const DATA_TEST_ID = 'PrivacyPolicy-intro';

export default function IntroSection({ data }: Readonly<IntroSectionProps>) {
  const { title, trustAndSecurity, agreement } = data;

  return (
    <>
      <Box sx={styles(theme).titleWrapper} data-testid={DATA_TEST_ID}>
        <Typography variant="h1" sx={styles(theme).title} data-testid={`${DATA_TEST_ID}-title`}>
          {title}
        </Typography>
      </Box>

      {(trustAndSecurity || agreement) && (
        <Box sx={styles(theme).introGrid} data-testid={`${DATA_TEST_ID}-content`}>
          {trustAndSecurity && (
            <PolicyContent doc={trustAndSecurity} paragraphSx={styles(theme).trustAndSecurityParagraph} />
          )}

          {agreement && <PolicyContent doc={agreement} paragraphSx={styles(theme).agreementParagraph} />}
        </Box>
      )}
    </>
  );
}
