import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { styles } from './Error.styles';

import OoPs from '~/public/images/OoPs.svg';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export default function ErrorComponent() {
  const breakpoints = useBreakpoints();
  const catSize = styles.carSize(breakpoints);

  const t = useTranslations('error');

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageContainer}>
        <OoPs style={styles.oops(breakpoints)} />
        <Image
          alt="kotyk"
          src="/images/kotyk.png"
          width={catSize.width}
          height={catSize.height}
          style={styles.carStyles as React.CSSProperties}
        />
      </Box>
      <Typography variant="h2" sx={styles.text}>
        {t('title')}
      </Typography>
      <Typography variant="customMedium16" sx={styles.subtext}>
        {t('subtitle')}
      </Typography>
    </Box>
  );
}
