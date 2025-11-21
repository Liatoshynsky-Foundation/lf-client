import { Box } from '@mui/material';

import { styles } from './WarCarouselSection.styles';

import Carousel from '~/shared/components/design-system/all-components/carousel/Carousel';

const images = [
  { id: 1, src: '/images/war-in-ukraine-page/carousel/photo-1.png', alt: 'Carousel Image 1', description: 'Image 1' },
  { id: 2, src: '/images/war-in-ukraine-page/carousel/photo-2.png', alt: 'Carousel Image 2', description: 'Image 2' },
  { id: 3, src: '/images/war-in-ukraine-page/carousel/photo-3.png', alt: 'Carousel Image 3', description: 'Image 3' }
];

const WarCarouselSection = () => {
  return (
    <Box sx={styles.carouselSectionContainer}>
      <Carousel images={images} initialIndex={0} />
    </Box>
  );
};

export default WarCarouselSection;
