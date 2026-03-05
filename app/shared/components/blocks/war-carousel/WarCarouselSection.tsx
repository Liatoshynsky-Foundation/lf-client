import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

import { styles } from './WarCarouselSection.styles';

import Carousel from '~/shared/components/design-system/all-components/carousel/Carousel';

const images = [
  {
    id: 1,
    src: '/images/war-in-ukraine-page/carousel/photo-1.png',
    alt: 'Carousel Image 1',
    description: ''
  },
  {
    id: 2,
    src: '/images/war-in-ukraine-page/carousel/photo-2.png',
    alt: 'Carousel Image 2',
    description: ''
  },
  {
    id: 3,
    src: '/images/war-in-ukraine-page/carousel/photo-3.png',
    alt: 'Carousel Image 3',
    description: ''
  }
];

const WarCarouselSection = () => {
  const t = useTranslations('warCarousel');

  const images = [
    {
      id: 1,
      src: '/images/war-in-ukraine-page/carousel/photo-1.png',
      alt: 'Carousel Image 1',
      description: t('photo1')
    },
    {
      id: 2,
      src: '/images/war-in-ukraine-page/carousel/photo-2.png',
      alt: 'Carousel Image 2',
      description: t('photo2')
    },
    {
      id: 3,
      src: '/images/war-in-ukraine-page/carousel/photo-3.png',
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
