import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import ListItem from '~/components/list-item/ListItem';
import SectionTitle from '~/components/section-title/SectionTitle';

import { styles } from './OurMission.styles';

const OurMission = async () => {
  const t = await getTranslations('home.ourMission');

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle title={t('title')} />
      <Box sx={styles.list}>
        <ListItem text={t('list.item1')} />
        <ListItem text={t('list.item2')} />
        <ListItem text={t('list.item3')} />
      </Box>
      <Box sx={styles.imagesContainer}>
        <ImageWithCaption
          src="/images/our-mission/tetiana-homon-small.jpg"
          alt="Tetiana Homon"
          caption={t('imageCaption')}
          align="left"
          sizes={{ width: { xs: 156, sm: 170, md: 266, lg: 336 }, height: { xs: 203, sm: 221, md: 319, lg: 400 } }}
          containerSx={{
            mt: { xs: '0px', sm: '-174px', md: '-248px', lg: '-296px', xl: '-268px' },
            mb: { xs: '56px', sm: '0px' }
          }}
        />
        <ImageWithCaption
          src="/images/our-mission/tetiana-homon-main.jpg"
          alt="Tetiana Homon"
          caption={t('imageCaption')}
          sizes={{
            width: { xs: 266, sm: 458, md: 569, lg: 750, xl: 816, xxl: 979, ultra: 816 },
            height: { xs: 164, sm: 292, md: 336, lg: 498, xl: 498, xxl: 498, ultra: 498 }
          }}
          border={{
            sizes: {
              width: { xs: 31, sm: 38, md: 57, lg: 80 },
              height: { xs: 134, sm: 134, md: 204, lg: 360 }
            },
            top: { xs: 16, sm: 20, md: 36, lg: 38, xl: 40 },
            left: { xs: 16, sm: 26, md: 41, lg: 40, xl: 40 }
          }}
          containerSx={{ ml: 'auto' }}
          imageSx={{ transform: { xs: 'translateX(24px)', ultra: 'none' } }}
          captionSx={{ pr: { xs: '0', ultra: '72px' } }}
        />
      </Box>
    </Box>
  );
};

export default OurMission;
