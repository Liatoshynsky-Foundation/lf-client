import { Box } from '@mui/material';
import Image from 'next/image';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';

import { getTitledParagraph } from '../../tip-tap-content/nodes';
import { iconSizes, styles } from './WhatWeDo.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IWhatWeDo } from '~/types/page/about-us.types';
import { TipTapDoc } from '~/types/types/tiptap.types';
import { generateSizesAttribute } from '~/utils/generateSizesAttribute';

const WhatWeDo = ({ data }: { data: IWhatWeDo }) => {
  const { title, items } = data;
  const sizesAttribute = generateSizesAttribute(iconSizes);

  return (
    <Box sx={styles.mainContainer} data-testid="WhatWeDo">
      <SectionTitle title={title} mb={0} dataTestId="WhatWeDo-title" />
      <Box sx={styles.grid} data-testid="WhatWeDo-listContainer">
        {items.map((item, index) => {
          const keyString = typeof item.title === 'string' ? item.title : `whatwedo-item-${index}`;

          const isLegacyDescription = typeof item.description === 'string';

          return (
            <Box sx={styles.item} key={keyString + index}>
              <Box sx={styles.icon}>
                <Image src="/icons/bullet-small.svg" alt="bullet icon" fill sizes={sizesAttribute} />
              </Box>

              {isLegacyDescription ? (
                <TitleWithDescription variant="whatWeDo" title={item.title} description={item.description} />
              ) : (
                <TipTapContent
                  data={item.description as TipTapDoc}
                  nodeRenderers={{
                    [TipTapNodeTypes.paragraph]: getTitledParagraph('whatWeDo', item.title)
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WhatWeDo;
