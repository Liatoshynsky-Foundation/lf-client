import { Box } from '@mui/material';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import SectionTitle from '~/components/section-title/SectionTitle';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';

import { iconSizes, styles } from './WhatWeDo.styles';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';

const whatWeDoData = [
  { titleKey: 'titlesList.title1' as const, descriptionKey: 'descriptionsList.descr1' as const },
  { titleKey: 'titlesList.title2' as const, descriptionKey: 'descriptionsList.descr2' as const },
  { titleKey: 'titlesList.title3' as const, descriptionKey: 'descriptionsList.descr3' as const },
  { titleKey: 'titlesList.title4' as const, descriptionKey: 'descriptionsList.descr4' as const },
  { titleKey: 'titlesList.title5' as const, descriptionKey: 'descriptionsList.descr5' as const }
];

const WhatWeDo = async () => {
  const t = await getTranslations('home.whatAreWeDoing');
  const sizesAttribute = generateSizesAttribute(iconSizes);

  const columns = [[whatWeDoData[0]], [whatWeDoData[1], whatWeDoData[3]], [whatWeDoData[2], whatWeDoData[4]]];

  const renderWhatWeDo = ({ titleKey, descriptionKey }: (typeof whatWeDoData)[0], key: string) => (
    <Box sx={styles.item} key={key}>
      <Box sx={styles.icon}>
        <Image src="/icons/bullet-small.svg" alt="bullet icon" fill sizes={sizesAttribute} />
      </Box>
      <TitleWithDescription variant="whatWeDo" title={t(titleKey)} description={t(descriptionKey)} />
    </Box>
  );

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle title={t('mainTitle')} mb={0} />
      <Box sx={styles.grid}>
        {columns.map((columnItems, colIndex) => (
          <Box
            key={`${colIndex}-${columnItems}`}
            sx={{
              ...styles.column,
              ...(colIndex === 0 && { alignItems: { lg: 'end' } })
            }}
          >
            {columnItems.map((item, itemIndex) => renderWhatWeDo(item, `${colIndex}-${itemIndex}`))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WhatWeDo;
