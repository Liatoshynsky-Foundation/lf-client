import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

import { styles } from './WarCarouselSection.styles';

import Carousel from '~/shared/components/design-system/all-components/carousel/Carousel';
import { IMAGES } from '~/shared/constants/assets';

const WarCarouselSection = () => {
  const t = useTranslations('warCarousel');

  const images = [
    {
      id: 1,
      src: IMAGES.WAR_IN_UKRAINE_CAROUSEL(1),
      alt: 'Carousel Image 1',
      description: t('photo1')
    },
    {
      id: 2,
      src: IMAGES.WAR_IN_UKRAINE_CAROUSEL(2),
      alt: 'Carousel Image 2',
      description: t('photo2')
    },
    {
      id: 3,
      src: IMAGES.WAR_IN_UKRAINE_CAROUSEL(3),
      alt: 'Carousel Image 3',
      description: t('photo3')
    }
  ];

  return (
    <Box sx={styles.carouselSectionContainer}>
      <Carousel images={images} infiniteLoop={true} />
    </Box>
  );
};

export default WarCarouselSection;
