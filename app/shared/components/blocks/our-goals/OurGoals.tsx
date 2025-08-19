import { Box } from '@mui/material';
import Image from 'next/image';

import SectionTitle from '~/components/section-title/SectionTitle';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';

import { iconSizes, styles } from './OurGoals.styles';
import { generateSizesAttribute } from '~/utils/generateSizesAttribute';

const OurGoals = ({ data }: { data: any }) => {
  const { mainTitle, goals } = data;
  const sizesAttribute = generateSizesAttribute(iconSizes);

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle title={mainTitle} mb={0} />
      <Box sx={styles.goalsGrid}>
        {goals.map((goal: any, index: any) => (
          <Box sx={styles.cardWithIcon} key={`${goal.description + index}`}>
            <Box sx={styles.iconWrapper}>
              <Image src="/icons/bullet-small.svg" alt="bullet icon" fill sizes={sizesAttribute} />
            </Box>
            <TitleWithDescription variant="goals" title={goal.title} description={goal.description} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OurGoals;
