import { Box } from '@mui/material';
import Logo from '~/shared/components/design-system/all-components/logo/Logo';
import Image from 'next/image';
import { styles } from '~/shared/components/Liatoshynsky-office/office-media/OfficeMedia.styles';
import { OfficeMediaProps } from '~/types/types/officeMedia';

const OfficeMedia: React.FC<OfficeMediaProps> = ({ images }) => {
  const imageSizes = '(max-width: 600px) 100px, (max-width: 900px) 140px, (max-width: 1200px) 160px, 200px';

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.mediaContainer}>
        {images.map((img, i) => (
          <Box key={i} sx={styles[img.styleKey]}>
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
