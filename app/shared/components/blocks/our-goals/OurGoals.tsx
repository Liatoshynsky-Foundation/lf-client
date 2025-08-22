import { Box } from '@mui/material';
import Image from 'next/image';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';

import { iconSizes, styles } from './OurGoals.styles';
import { IOurGoals } from '~/types/types/about-us.types';
import { generateSizesAttribute } from '~/utils/generateSizesAttribute';

const OurGoals = ({ data }: { data: IOurGoals }) => {
  const { title, goals } = data;
  const sizesAttribute = generateSizesAttribute(iconSizes);

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle title={title} mb={0} />
      <Box sx={styles.goalsGrid}>
        {goals.map((goal, index) => (
          <Box sx={styles.cardWithIcon} key={`${goal.title + index}`}>
            <Box sx={styles.iconWrapper}>
              <Image src="/icons/bullet-small.svg" alt="bullet icon" fill sizes={sizesAttribute} />
            </Box>
            <TipTapContent
              data={goal.description}
              nodeRenderers={{
                paragraph: (children) => (
                  <TitleWithDescription variant="goals" title={goal.title} description={children} />
                )
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OurGoals;
