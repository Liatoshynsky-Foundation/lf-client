import { Box, Typography } from '@mui/material';

import { theme } from '~/ds-components/theme/Theme';

import { styles } from './IntroSection.styles';
import { type TipTapDoc } from '~/types/types/tiptap.types';

import { PolicyContent } from '~/shared/components/blocks/privacy-policy/policy-content/PolicyContent';

type IntroSectionProps = {
  title: string;
  trustAndSecurity?: TipTapDoc;
  agreement?: TipTapDoc;
  dataTestId?: string;
};

export default function IntroSection({ title, trustAndSecurity, agreement, dataTestId }: Readonly<IntroSectionProps>) {
  return (
    <>
      <Box sx={styles(theme).titleWrapper} data-testid={dataTestId}>
        <Typography variant="h1" sx={styles(theme).title} data-testid={`${dataTestId}-title`}>
          {title}
        </Typography>
      </Box>

      {(trustAndSecurity || agreement) && (
        <Box sx={styles(theme).introGrid} data-testid={`${dataTestId}-content`}>
          {trustAndSecurity && (
            <PolicyContent doc={trustAndSecurity} paragraphSx={styles(theme).trustAndSecurityParagraph} />
          )}

          {agreement && <PolicyContent doc={agreement} paragraphSx={styles(theme).agreementParagraph} />}
        </Box>
      )}
    </>
  );
}
