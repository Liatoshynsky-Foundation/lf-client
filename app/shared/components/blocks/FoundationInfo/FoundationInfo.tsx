import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { SvgImage } from '~/components/svg-image/SvgImage';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import { styles } from './FoundationInfo.styles';
import { IFoundationInfo } from '~/types/page/about-us.types';

import { extractTextFromTipTap, isTipTapDoc } from '~/lib/utils/tiptapHelpers';
import CroppedImage from '~/shared/components/cropped-image/CroppedImage';

export default function FoundationInfo({ data }: { readonly data: IFoundationInfo }) {
  const { image, ourOrganisation, ourName, ourBelief } = data;

  const organisationParagraph = (children: React.ReactNode) => (
    <Typography sx={styles.explanationText} data-testid="FoundationInfo-explanationText">
      {children}
    </Typography>
  );

  const organisationBoldText = (children: React.ReactNode) => (
    <Box component="strong" sx={styles.organisationText} data-testid="FoundationInfo-organisationText">
      {children}
    </Box>
  );

  const nameParagraph = (children: React.ReactNode) => (
    <Typography sx={styles.textSection} data-testid="FoundationInfo-textSection">
      {children}
    </Typography>
  );

  const beliefParagraph = (children: React.ReactNode) => (
    <Typography sx={styles.textImage} data-testid="FoundationInfo-textImage">
      {children}
    </Typography>
  );

  const imageAltText = (
    image ? (isTipTapDoc(image.alt) ? extractTextFromTipTap(image.alt) : (image.alt ?? '')) : ''
  ) as string;

  return (
    <Box sx={styles.container} data-testid="FoundationInfo">
      <Box sx={styles.firstBulletIcon} data-testid="FoundationInfo-firstBulletIcon">
        <SvgImage src="/icons/ellipse.svg" alt="bullet point" width={22} height={20} />
      </Box>
      <Box sx={styles.organisationSection} data-testid="FoundationInfo-organisationSection">
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

      <Box sx={styles.explanationSection} data-testid="FoundationInfo-explanationSection">
        <TipTapContent
          data={ourName}
          nodeRenderers={{
            paragraph: nameParagraph
          }}
        />
      </Box>

      <Box sx={styles.secondBulletIcon} data-testid="FoundationInfo-secondBulletIcon">
        <SvgImage src="/icons/ellipse.svg" alt="bullet point" width={22} height={20} />
      </Box>

      <TipTapContent
        data={ourBelief}
        nodeRenderers={{
          paragraph: beliefParagraph
        }}
      />

      <Box sx={styles.bodyImage} data-testid="FoundationInfo-bodyImage">
        {image && (
          <CroppedImage
            src={image.generatedSrc}
            alt={imageAltText}
            crop={image.crop}
            fill={false}
            width={410}
            height={490}
            imageStyle={{
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
