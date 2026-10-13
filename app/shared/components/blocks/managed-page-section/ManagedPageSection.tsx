'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';

import { renderData } from '../../tip-tap-content/nodes';
import { iconSizes, styles } from './ManagedPageSection.styles';
import { MANAGED_PAGE_SECTION_ITEM_TYPE, type ManagedPageSectionBlock } from '~/types/page/managed-page-section.types';
import { RichContent } from '~/types/types/tiptap.types';
import { generateSizesAttribute } from '~/utils/generateSizesAttribute';

interface ManagedPageSectionProps {
  data: ManagedPageSectionBlock<RichContent>;
}

const SectionItemContent = ({ value }: { value: RichContent }) => <TipTapContent data={renderData(value)} />;

const ManagedPageSection = ({ data }: ManagedPageSectionProps) => {
  const { title, items } = data;
  const sizesAttribute = generateSizesAttribute(iconSizes);

  return (
    <Box sx={styles.mainContainer} data-testid="ManagedPageSection">
      <SectionTitle title={title} mb={0} dataTestId="ManagedPageSection" />

      {items.length > 0 && (
        <Box sx={styles.items} data-testid="ManagedPageSection-items">
          {items.map((item) => {
            if (item.type === MANAGED_PAGE_SECTION_ITEM_TYPE.SUBTITLE) {
              return (
                <TitleWithDescription
                  key={item.id}
                  variant="goals"
                  title={item.value}
                  dataTestId={`ManagedPageSection-subtitle-${item.id}`}
                />
              );
            }

            if (item.type === MANAGED_PAGE_SECTION_ITEM_TYPE.BULLET) {
              return (
                <Box key={item.id} sx={styles.bulletItem} data-testid={`ManagedPageSection-bullet-${item.id}`}>
                  <Box sx={styles.iconWrapper} data-testid="ManagedPageSection-icon">
                    <Image src="/icons/bullet-small.svg" alt="" fill sizes={sizesAttribute} />
                  </Box>
                  <SectionItemContent value={item.value} />
                </Box>
              );
            }

            return (
              <Box key={item.id} data-testid={`ManagedPageSection-paragraph-${item.id}`}>
                <SectionItemContent value={item.value} />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ManagedPageSection;
