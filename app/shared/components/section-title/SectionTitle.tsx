import { Box, SxProps, Theme, Typography } from '@mui/material';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { imageSizes, styles } from './SectionTitle.styles';
import { sxToArray } from '~/utils/sxToArray';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';

interface SectionTitleProps {
  icon?: boolean;
  mb?: number | string;
  gridColumn?: object;
  title: { uk: string; en: string } | string;
  sx?: SxProps<Theme>;
  dataTestId?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon = true, mb, title, gridColumn, sx, dataTestId }) => {
  const sizesAttribute = generateSizesAttribute(imageSizes);
  const locale = useLocale();

  return (
    <Box sx={[styles.container(mb), ...sxToArray(sx)]} data-testid={dataTestId}>
      {icon && (
        <Box sx={styles.image} {...(dataTestId ? { 'data-testid': `${dataTestId}-icon` } : {})}>
          <Image src="/icons/ellipse.svg" alt="ellipse" fill sizes={sizesAttribute} />
        </Box>
      )}
      <Typography
        sx={styles.title(gridColumn)}
        component="h2"
        {...(dataTestId ? { 'data-testid': `${dataTestId}-title` } : {})}
      >
        {typeof title === 'string' ? title : title[locale]}
      </Typography>
    </Box>
  );
};

export default SectionTitle;
