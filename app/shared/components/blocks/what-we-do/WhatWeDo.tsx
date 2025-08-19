import { Box } from '@mui/material';
import Image from 'next/image';

import SectionTitle from '~/components/section-title/SectionTitle';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';

import { iconSizes, styles } from './WhatWeDo.styles';
import { generateSizesAttribute } from '~/utils/generateSizesAttribute';

const WhatWeDo = ({ data }: { data: any }) => {
  const { mainTitle, items } = data;
  const columns = [items.slice(0, 1), items.slice(1, 3), items.slice(3, 5)];
  const sizesAttribute = generateSizesAttribute(iconSizes);

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle title={mainTitle} mb={0} />
      <Box sx={styles.grid}>
        {columns.map((columnItems, colIndex) => (
          <Box
            key={columnItems[colIndex]?.description + `column-${colIndex}`}
            sx={{
              ...styles.column
            }}
          >
            {columnItems.map((item: any, itemIndex: any) => (
              <Box sx={styles.item} key={item.id ?? `item-${itemIndex}`}>
                <Box sx={styles.icon}>
                  <Image src="/icons/bullet-small.svg" alt="bullet icon" fill sizes={sizesAttribute} />
                </Box>
                <TitleWithDescription variant="whatWeDo" title={item.title} description={item.description} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WhatWeDo;
