import { Box } from '@mui/material';
import Image from 'next/image';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';

import { iconSizes, styles } from './WhatWeDo.styles';
import { IWhatWeDo } from '~/types/page/about-us.types';
import { generateSizesAttribute } from '~/utils/generateSizesAttribute';

const getParagraph = (title: string) => {
  const Paragraph = (children: React.ReactNode) => (
    <TitleWithDescription variant="whatWeDo" title={title} description={children} />
  );
  return Paragraph;
};

const WhatWeDo = ({ data }: { data: IWhatWeDo }) => {
  const { title, items } = data;
  const columns = [items.slice(0, 1), items.slice(1, 3), items.slice(3, 5)];
  const sizesAttribute = generateSizesAttribute(iconSizes);

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle title={title} mb={0} />
      <Box sx={styles.grid}>
        {columns.map((columnItems, colIndex) => (
          <Box
            key={columnItems[colIndex]?.title + `column-${colIndex}`}
            sx={{
              ...styles.column
            }}
          >
            {columnItems.map((item, itemIndex) => (
              <Box sx={styles.item} key={`item-${itemIndex}`}>
                <Box sx={styles.icon}>
                  <Image src="/icons/bullet-small.svg" alt="bullet icon" fill sizes={sizesAttribute} />
                </Box>
                <TipTapContent
                  data={item.description}
                  nodeRenderers={{
                    paragraph: getParagraph(item.title)
                  }}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WhatWeDo;
