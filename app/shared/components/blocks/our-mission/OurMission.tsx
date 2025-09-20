import { Box } from '@mui/material';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import ListItem from '~/components/list-item/ListItem';
import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import { styles } from './OurMission.styles';
import { IOurMission } from '~/types/page/about-us.types';

const getListItem = (children: React.ReactNode) => <ListItem text={children} />;

const OurMission = ({ data }: { data: IOurMission }) => {
  const { title, smallImage, bigImage, list } = data;

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle title={title} />
      <Box sx={styles.list}>
        {list.map((item, idx) => (
          <TipTapContent key={`${item.type}-${idx}`} data={item} nodeRenderers={{ paragraph: getListItem }} />
        ))}
      </Box>
      <Box sx={styles.imagesContainer}>
        {smallImage && (
          <ImageWithCaption
            src={smallImage.src}
            alt={smallImage.alt}
            caption={smallImage.caption ?? ''}
            align="left"
            sizes={{ width: { xs: 156, sm: 170, md: 266, lg: 336 }, height: { xs: 203, sm: 221, md: 319, lg: 400 } }}
            containerSx={{
              mt: { xs: '0px', sm: '-174px', md: '-248px', lg: '-296px', xl: '-268px' },
              mb: { xs: '56px', sm: '0px' }
            }}
          />
        )}
        {bigImage && (
          <ImageWithCaption
            src={bigImage.src}
            alt={bigImage.alt}
            caption={bigImage.caption ?? ''}
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
        )}
      </Box>
    </Box>
  );
};

export default OurMission;
