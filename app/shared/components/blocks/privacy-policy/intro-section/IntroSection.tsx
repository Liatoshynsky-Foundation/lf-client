import { Box, Typography } from '@mui/material';

import { theme } from '~/ds-components/theme/Theme';

import { styles } from './IntroSection.styles';
import { type TipTapDoc } from '~/types/types/common.types';

import { PolicyContent } from '~/shared/components/blocks/privacy-policy/policy-content/PolicyContent';

type IntroSectionProps = {
  title: string;
  trustAndSecurity?: TipTapDoc;
  agreement?: TipTapDoc;
};

export default function IntroSection({ title, trustAndSecurity, agreement }: Readonly<IntroSectionProps>) {
  return (
    <>
      <Box sx={styles(theme).titleWrapper}>
        <Typography sx={styles(theme).title}>{title}</Typography>
      </Box>

      {(trustAndSecurity || agreement) && (
        <Box sx={styles(theme).introGrid}>
          {trustAndSecurity && (
            <PolicyContent doc={trustAndSecurity} paragraphSx={styles(theme).trustAndSecurityParagraph} />
          )}

          {agreement && <PolicyContent doc={agreement} paragraphSx={styles(theme).agreementParagraph} />}
        </Box>
      )}
    </>
  );
}
