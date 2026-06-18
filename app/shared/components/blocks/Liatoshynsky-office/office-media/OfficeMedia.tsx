import { Box } from '@mui/material';

import { styles } from '~/components/blocks/Liatoshynsky-office/office-media/OfficeMedia.styles';
import Logo from '~/ds-components/logo/Logo';

import { ImageData } from '~/types/types/officeMedia';

import { IMAGES } from '~/shared/constants/assets';

interface OfficeMedia {
  dataTestId?: string;
}

const OfficeMedia: React.FC<OfficeMedia> = ({ dataTestId }) => {
  const images: ImageData[] = [
    { src: IMAGES.MEDIA_LF_OFFICE(1), alt: 'Фото 1', styleKey: 'photo1' },
    { src: IMAGES.MEDIA_LF_OFFICE(2), alt: 'Фото 2', styleKey: 'photo2' },
    { src: IMAGES.MEDIA_LF_OFFICE(3), alt: 'Фото 3', styleKey: 'photo3' }
  ];

  return (
    <Box sx={styles.mainContainer} data-testid={dataTestId}>
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
