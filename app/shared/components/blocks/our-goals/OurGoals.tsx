'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import { getTitledParagraph, renderData } from '../../tip-tap-content/nodes';
import { iconSizes, styles } from './OurGoals.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IOurGoals } from '~/types/page/about-us.types';
import { generateSizesAttribute } from '~/utils/generateSizesAttribute';

import { extractTextFromTipTap, getPlainString, isTipTapDoc } from '~/lib/utils/tiptapHelpers';

const OurGoals = ({ data }: { data: IOurGoals }) => {
  const { title, goals } = data;
  const sizesAttribute = generateSizesAttribute(iconSizes);

  return (
    <Box sx={styles.mainContainer} data-testid="OurGoals">
      <SectionTitle title={title} mb={0} dataTestId="OurGoals" />

      <Box sx={styles.goalsGrid} data-testid="OurGoals-goalsGrid">
        {goals.map((goal, index) => {
          const plainTitleText = isTipTapDoc(goal.title)
            ? extractTextFromTipTap(goal.title)
            : getPlainString(goal.title);

          const normalizedPrefix = plainTitleText.trim()
            ? plainTitleText.replace(/\s+/g, '-').substring(0, 20)
            : 'goal';

          const itemKey = `${normalizedPrefix}-${index}`;

          return (
            <Box sx={styles.cardWithIcon} key={itemKey}>
              <Box sx={styles.iconWrapper} data-testid="OurGoals-icon">
                <Image src="/icons/bullet-small.svg" alt="bullet icon" fill sizes={sizesAttribute} />
              </Box>

              {goal.description && (
                <TipTapContent
                  data={renderData(goal.description)}
                  nodeRenderers={{
                    [TipTapNodeTypes.paragraph]: getTitledParagraph('goals', goal.title)
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

export default OurGoals;
