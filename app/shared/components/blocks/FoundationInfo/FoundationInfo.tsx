import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { SvgImage } from '~/components/svg-image/SvgImage';
import { theme } from '~/ds-components/theme/Theme';

import { styles } from './FoundationInfo.styles';

export default function FoundationInfo({ data }: { readonly data: any }) {
  const { textImage, foundationImage, organisationMainText, organisationBoldText, mainText } = data;
  const sectionStyles = styles(theme);

  return (
    <Box sx={sectionStyles.container}>
      <Box sx={sectionStyles.organisationSection}>
        <Typography sx={sectionStyles.explanationText}>
          <Box component="span" sx={sectionStyles.organisationText}>
            {organisationBoldText}
          </Box>
          {organisationMainText}
        </Typography>
      </Box>

      <Box sx={sectionStyles.explanationSection}>
        <Typography sx={sectionStyles.textSection}>{mainText}</Typography>
        <Box sx={sectionStyles.FirstBulletIcon}>
          <SvgImage src="/icons/ellipse.svg" alt="bullet point" width={30} height={32} />
        </Box>
      </Box>

      <Typography sx={sectionStyles.textImage}>{textImage}</Typography>

      <Box sx={sectionStyles.bodyImage}>
        {foundationImage && (
          <Image
            src={foundationImage.src}
            alt={foundationImage.alt}
            fill
            style={{ objectFit: 'contain', objectPosition: 'top' }}
          />
        )}
      </Box>
    </Box>
  );
}
