import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { theme } from '~/ds-components/theme/Theme';

import ImageWithCaption from '../../image-with-caption/ImageWithCaption';
import QuoteBlock from '../../Quote/Quote';
import { SvgImage } from '../../svg-image/SvgImage';
import { styles } from './AboutFoundation.styles';

const AboutFoundation = async () => {
  const sectionStyles = styles(theme);
  const t = await getTranslations('home.aboutFoundation');
  const quote = await getTranslations('quote');

  const title = t('aboutFoundationTitle');
  const images = [
    { src: '/images/about-foundation/foundation-first.png', alt: 'Тетяна Гомон та команда Фонду Лятошинського' },
    { src: '/images/about-foundation/foundation-second.png', alt: 'Борис Лятошинський' }
  ];
  const organisationText = {
    boldText: t('organisationText.boldText'),
    mainText: t('organisationText.text')
  };
  const mainText = t('mainText');
  const textImage = t('textImage');
  const quoteInfo = {
    mainText: quote('mainText'),
    sourceTitle: quote('sourceText.tittle'),
    sourceData: quote('sourceText.data'),
    sourcePlace: quote('sourceText.place')
  };
  return (
    <Box sx={sectionStyles.conatiner}>
      <Typography sx={sectionStyles.title}>{title}</Typography>
      <Box sx={sectionStyles.photoContainer}>
        <ImageWithCaption
          src={images[0].src}
          alt={images[0].alt}
          caption={images[0].alt}
          sizes={{
            width: { xs: 266, sm: 456, md: 567, lg: 717, xl: 816, xxl: 979 },
            height: { xs: 158, sm: 264, md: 300 }
          }}
          border={{
            sizes: {
              width: { xs: 134, sm: 255, md: 269, lg: 376 },
              height: { xs: 28, sm: 55, md: 52, lg: 72 }
            },
            top: { xs: 16, sm: 20, md: 36, lg: 38, xl: 34 },
            left: { xs: 16, sm: 26, md: 41, lg: 40, xl: 40 }
          }}
          containerSx={sectionStyles.ImageContainer}
          captionSx={sectionStyles.ImageCaption}
        />
      </Box>
      <Box sx={sectionStyles.quote}>
        <QuoteBlock
          quoteText={quoteInfo.mainText}
          quoteIconColor="burgundy"
          mainTextColor="burgundy"
          alignRight={false}
          sourceText={{
            title: quoteInfo.sourceTitle,
            data: quoteInfo.sourceData,
            place: quoteInfo.sourcePlace
          }}
        />
      </Box>
      <Box sx={sectionStyles.SecondBulletIcon}>
        <SvgImage src="/icons/ellipse.svg" alt="bullet point" width={30} height={32} />
      </Box>
      <Box sx={sectionStyles.organisationSection}>
        <Typography sx={sectionStyles.explanationText}>
          <Box component="span" sx={sectionStyles.organisationText}>
            {organisationText.boldText}{' '}
          </Box>{' '}
          {organisationText.mainText}
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
        <Image src={images[1].src} alt={images[1].alt} fill style={{ objectFit: 'contain' }} />
      </Box>
    </Box>
  );
};
export default AboutFoundation;
