import { Box } from '@mui/material';

import { styles } from './WarCarouselSection.styles';

import Carousel from '~/shared/components/design-system/all-components/carousel/Carousel';

const images = [
  { id: 1, src: '/images/carousel/carousel-1.png', alt: 'Carousel Image 1', description: 'Image 1' },
  { id: 2, src: '/images/carousel/carousel-2.png', alt: 'Carousel Image 2', description: 'Image 2' },
  { id: 3, src: '/images/carousel/carousel-3.png', alt: 'Carousel Image 3', description: 'Image 3' },
  { id: 4, src: '/images/carousel/carousel-4.png', alt: 'Carousel Image 4' },
  { id: 5, src: '/images/carousel/carousel-5.png', alt: 'Carousel Image 5', description: 'Image 5' }
];

const WarCarouselSection = () => {
  return (
    <Box sx={styles.carouselSectionContainer}>
      <Carousel images={images} initialIndex={0} />
    </Box>
  );
};

export default WarCarouselSection;
