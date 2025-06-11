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
        <Box sx={sectionStyles.yellowBlock} />
        <Box sx={sectionStyles.imageFirst}>
          <ImageWithCaption
            src={images[0].src}
            alt={images[0].alt}
            caption={images[0].alt}
            sizes={{ height: { xs: 315 }, width: { xs: 800, sm: 900 } }}
            captionSx={sectionStyles.ImageCaption}
            containerSx={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>
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
      <Box sx={sectionStyles.organisationSection}>
        <Typography sx={sectionStyles.explanationText}>
          <Box component="span" sx={sectionStyles.organisationText}>
            {organisationText.boldText}{' '}
          </Box>{' '}
          {organisationText.mainText}
        </Typography>
      </Box>
      <Box sx={sectionStyles.bulletIcon}>
        <SvgImage src="/icons/ellipse.svg" alt="bullet point" width={30} height={32} />
      </Box>
      <Box sx={sectionStyles.explanationSection}>
        <Typography sx={sectionStyles.textSection}>{mainText}</Typography>
      </Box>
      <Box sx={sectionStyles.textImageSection}>
        <Typography sx={sectionStyles.textImage}>{textImage}</Typography>
        <Box sx={sectionStyles.bodyImage}>
          <Image src={images[1].src} alt={images[1].alt} width={350} height={400} />
        </Box>
      </Box>
    </Box>
  );
};
export default AboutFoundation;
