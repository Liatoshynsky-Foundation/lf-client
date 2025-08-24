import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { SvgImage } from '~/components/svg-image/SvgImage';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import { theme } from '~/ds-components/theme/Theme';

import { styles } from './FoundationInfo.styles';
import { IFoundationInfo } from '~/types/page/about-us.types';

export default function FoundationInfo({ data }: { readonly data: IFoundationInfo }) {
  const { image, ourOrganisation, ourName, ourBelief } = data;
  const sectionStyles = styles(theme);

  const organisationParagraph = (children: React.ReactNode) => (
    <Typography sx={sectionStyles.explanationText}>{children}</Typography>
  );

  const organisationBoldText = (children: React.ReactNode) => (
    <Box component="strong" sx={sectionStyles.organisationText}>
      {children}
    </Box>
  );

  const nameParagraph = (children: React.ReactNode) => (
    <Typography sx={sectionStyles.textSection}>{children}</Typography>
  );

  const beliefParagraph = (children: React.ReactNode) => (
    <Typography sx={sectionStyles.textImage}>{children}</Typography>
  );

  return (
    <Box sx={sectionStyles.container}>
      <Box sx={sectionStyles.organisationSection}>
        <TipTapContent
          data={ourOrganisation}
          markRenderers={{
            bold: organisationBoldText
          }}
          nodeRenderers={{
            paragraph: organisationParagraph
          }}
        />
      </Box>

      <Box sx={sectionStyles.explanationSection}>
        <TipTapContent
          data={ourName}
          nodeRenderers={{
            paragraph: nameParagraph
          }}
        />
        <Box sx={sectionStyles.FirstBulletIcon}>
          <SvgImage src="/icons/ellipse.svg" alt="bullet point" width={30} height={32} />
        </Box>
      </Box>

      <TipTapContent
        data={ourBelief}
        nodeRenderers={{
          paragraph: beliefParagraph
        }}
      />

      <Box sx={sectionStyles.bodyImage}>
        {image && (
          <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'contain', objectPosition: 'top' }} />
        )}
      </Box>
    </Box>
  );
}
