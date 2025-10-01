import { Box } from '@mui/material';

import { styles } from '~/components/blocks/Liatoshynsky-office/office-media/OfficeMedia.styles';
import Logo from '~/ds-components/logo/Logo';

import { ImageData } from '~/types/types/officeMedia';

const OfficeMedia: React.FC = () => {
  const images: ImageData[] = [
    { src: '/images/office-media/lf-office1.png', alt: 'Фото 1', styleKey: 'photo1' },
    { src: '/images/office-media/lf-office2.png', alt: 'Фото 2', styleKey: 'photo2' },
    { src: '/images/office-media/lf-office3.png', alt: 'Фото 3', styleKey: 'photo3' }
  ];

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.mediaContainer}>
        {images.map((img) => (
          <Box
            key={img.styleKey}
            sx={[{ backgroundImage: `url(${img.src})` }, styles[img.styleKey]]}
            data-testid={'img'}
          />
        ))}
      </Box>
      <Box sx={styles.logo}>
        <Logo color="white" variant="office" />
      </Box>
    </Box>
  );
};

export default OfficeMedia;
