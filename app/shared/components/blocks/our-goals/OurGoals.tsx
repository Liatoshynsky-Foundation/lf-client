import { Box } from '@mui/material';
import Image from 'next/image';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';

import { iconSizes, styles } from './OurGoals.styles';
import { IOurGoals } from '~/types/page/about-us.types';
import { generateSizesAttribute } from '~/utils/generateSizesAttribute';

const getParagraph = (title: string) => {
  const Paragraph = (children: React.ReactNode) => (
    <TitleWithDescription variant="goals" title={title} description={children} />
  );
  return Paragraph;
};

const OurGoals = ({ data }: { data: IOurGoals }) => {
  const { title, goals } = data;
  const sizesAttribute = generateSizesAttribute(iconSizes);

  return (
    <Box sx={styles.mainContainer} data-testid="OurGoals">
      <SectionTitle title={title} mb={0} data-testid="OurGoals-title" />
      <Box sx={styles.goalsGrid} data-testid="OurGoals-goalsGrid">
        {goals.map((goal, index) => (
          <Box sx={styles.cardWithIcon} key={`${goal.title + index}`}>
            <Box sx={styles.iconWrapper}>
              <Image src="/icons/bullet-small.svg" alt="bullet icon" fill sizes={sizesAttribute} />
            </Box>
            <TipTapContent
              data={goal.description}
              nodeRenderers={{
                paragraph: getParagraph(goal.title)
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OurGoals;
