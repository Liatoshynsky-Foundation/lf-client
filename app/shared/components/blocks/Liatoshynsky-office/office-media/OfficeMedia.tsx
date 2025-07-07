import { Box } from '@mui/material';
import Image from 'next/image';

import { styles } from '~/components/blocks/Liatoshynsky-office/office-media/OfficeMedia.styles';
import Logo from '~/ds-components/logo/Logo';

import { ImageData } from '~/types/types/officeMedia';

const OfficeMedia: React.FC = () => {
  const imageSizes = '(max-width: 600px) 100px, (max-width: 900px) 140px, (max-width: 1200px) 160px, 200px';
  const images: ImageData[] = [
    { src: '/images/office-media/lf-office1.png', alt: 'Фото 1', styleKey: 'photo1' },
    { src: '/images/office-media/lf-office2.png', alt: 'Фото 2', styleKey: 'photo2' },
    { src: '/images/office-media/lf-office3.png', alt: 'Фото 3', styleKey: 'photo3' }
  ];

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.mediaContainer}>
        {images.map((img) => (
          <Box key={img.styleKey} sx={styles[img.styleKey]}>
            <Image src={img.src} alt={img.alt} fill sizes={imageSizes} priority />
          </Box>
        ))}
      </Box>
      <Box sx={styles.logo}>
        <Logo color="white" variant="office" />
      </Box>
    </Box>
  );
};

export default OfficeMedia;
