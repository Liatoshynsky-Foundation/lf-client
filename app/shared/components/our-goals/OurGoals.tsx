import { Box } from '@mui/material';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import SectionTitle from '~/components/section-title/SectionTitle';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';

import { iconSizes, styles } from './OurGoals.styles';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';

const OurGoals = async () => {
  const t = await getTranslations('home.ourGoals');

  const goalsData = [
    { titleKey: 'titles.title1' as const, descriptionKey: 'descriptions.descr1' as const },
    { titleKey: 'titles.title2' as const, descriptionKey: 'descriptions.descr2' as const },
    { titleKey: 'titles.title3' as const, descriptionKey: 'descriptions.descr3' as const },
    { titleKey: 'titles.title4' as const, descriptionKey: 'descriptions.descr4' as const }
  ];
  const sizesAttribute = generateSizesAttribute(iconSizes);

  const renderGoalItem = ({ titleKey, descriptionKey }: (typeof goalsData)[0], index: number) => (
    <Box sx={styles.cardWithIcon} key={index}>
      <Box sx={styles.iconWrapper}>
        <Image src="/icons/bullet-small.svg" alt="bullet icon" fill sizes={sizesAttribute} />
      </Box>
      <TitleWithDescription variant="goals" title={t(titleKey)} description={t(descriptionKey)} />
    </Box>
  );

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle title={t('maintitle')} mb={0} />
      <Box sx={styles.goalsGrid}>{goalsData.map(renderGoalItem)}</Box>
    </Box>
  );
};

export default OurGoals;
