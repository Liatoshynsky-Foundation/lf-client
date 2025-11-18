import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import React, { useMemo } from 'react';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import CustomLink from '~/ds-components/link/CustomLink';

import { styles, TITLE_GRID_COLUMN, TITLE_SX } from './FundSummaryHeader.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

type Locale = 'uk' | 'en';
type LocalizedString = Record<Locale, string>;
type LocalizedTipTapDoc = Record<Locale, TipTapDoc>;

export type FundSummaryHeaderDataItem = {
  title: LocalizedString;
  description: LocalizedTipTapDoc;
};

export interface FundSummaryHeaderData {
  items: FundSummaryHeaderDataItem[];
}

export interface FundSummaryHeaderProps {
  backLinkUrl: string;
  backLinkText: string;
  title: string;
  data: FundSummaryHeaderData;
}

const ARROW_BACK_ICON = <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} aria-hidden="true" />;

const customParagraphRenderer = (children: React.ReactNode) => (
  <Typography variant="body2" sx={{ fontSize: '16px' }}>
    {children}
  </Typography>
);

const splitIntoColumns = <T,>(items: T[]) => ({
  leftColumn: items.filter((_, index) => index % 2 === 0),
  rightColumn: items.filter((_, index) => index % 2 === 1)
});

const getItemKey = (item: FundSummaryHeaderDataItem, locale: Locale, index: number): string => {
  const titleText = item.title[locale];
  return `${titleText.slice(0, 30)}-${index}`;
};

interface ContentItemProps {
  item: FundSummaryHeaderDataItem;
  locale: Locale;
  index: number;
}

const ContentItem: React.FC<ContentItemProps> = React.memo(({ item, locale, index }) => (
  <Box key={getItemKey(item, locale, index)} sx={styles.contentItem}>
    <Typography variant="h6" sx={styles.itemTitle}>
      {item.title[locale]}:
    </Typography>
    <TipTapContent
      data={item.description[locale]}
      nodeRenderers={{ [TipTapNodeTypes.paragraph]: customParagraphRenderer }}
    />
  </Box>
));

ContentItem.displayName = 'ContentItem';

const FundSummaryHeader: React.FC<FundSummaryHeaderProps> = ({ backLinkUrl, backLinkText, title, data }) => {
  const locale = useLocale() as Locale;

  const { leftColumn, rightColumn } = useMemo(() => splitIntoColumns(data.items), [data.items]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.backLink}>
        <CustomLink path={backLinkUrl} startIcon={ARROW_BACK_ICON} labelSx={{ fontSize: '16px' }}>
          {backLinkText}
        </CustomLink>
      </Box>

      <Box sx={styles.title}>
        <SectionTitle title={title} icon={false} gridColumn={TITLE_GRID_COLUMN} sx={TITLE_SX} />
      </Box>

      <Box sx={styles.contentGrid}>
        <Box sx={styles.column}>
          {leftColumn.map((item, index) => (
            <ContentItem key={getItemKey(item, locale, index * 2)} item={item} locale={locale} index={index * 2} />
          ))}
        </Box>

        <Box sx={{ ...styles.column, display: { xs: 'none', sm: 'flex' } }}>
          {rightColumn.map((item, index) => (
            <ContentItem
              key={getItemKey(item, locale, index * 2 + 1)}
              item={item}
              locale={locale}
              index={index * 2 + 1}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

FundSummaryHeader.displayName = 'FundSummaryHeader';

export default FundSummaryHeader;
