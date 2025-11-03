import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { SvgImage } from '~/components/svg-image/SvgImage';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import { styles } from './FoundationInfo.styles';
import { IFoundationInfo } from '~/types/page/about-us.types';

export default function FoundationInfo({ data }: { readonly data: IFoundationInfo }) {
  const { image, ourOrganisation, ourName, ourBelief } = data;

  const organisationParagraph = (children: React.ReactNode) => (
    <Typography sx={styles.explanationText}>{children}</Typography>
  );

  const organisationBoldText = (children: React.ReactNode) => (
    <Box component="strong" sx={styles.organisationText}>
      {children}
    </Box>
  );

  const nameParagraph = (children: React.ReactNode) => <Typography sx={styles.textSection}>{children}</Typography>;

  const beliefParagraph = (children: React.ReactNode) => <Typography sx={styles.textImage}>{children}</Typography>;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.firstBulletIcon}>
        <SvgImage src="/icons/ellipse.svg" alt="bullet point" width={22} height={20} />
      </Box>
      <Box sx={styles.organisationSection}>
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

      <Box sx={styles.explanationSection}>
        <TipTapContent
          data={ourName}
          nodeRenderers={{
            paragraph: nameParagraph
          }}
        />
      </Box>

      <Box sx={styles.secondBulletIcon}>
        <SvgImage src="/icons/ellipse.svg" alt="bullet point" width={22} height={20} />
      </Box>

      <TipTapContent
        data={ourBelief}
        nodeRenderers={{
          paragraph: beliefParagraph
        }}
      />

      <Box sx={styles.bodyImage}>
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill={false}
            width={410}
            height={490}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'top',
              position: 'relative'
            }}
          />
        )}
      </Box>
    </Box>
  );
}
