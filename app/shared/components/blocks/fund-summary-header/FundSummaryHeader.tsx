import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import React from 'react';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import CustomLink from '~/ds-components/link/CustomLink';

import { styles } from './FundSummary.styles';
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

interface Props {
  backLinkUrl: string;
  backLinkText: string;
  title: string;
  data: FundSummaryHeaderData;
}

const arrowBackIcon = <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} aria-hidden="true" />;

const FundSummaryHeader: React.FC<Props> = ({ backLinkUrl, backLinkText, title, data }) => {
  const locale = useLocale() as Locale;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.backLink}>
        <CustomLink path={backLinkUrl} startIcon={arrowBackIcon}>
          {backLinkText}
        </CustomLink>
      </Box>
      <Box sx={styles.title}>
        <SectionTitle
          title={title}
          icon={false}
          gridColumn={{ xs: '1 / -1', sm: '1 / -1', md: '1 / -1' }}
          sx={{ '& h2': { fontSize: { xxl: '56px' } } }}
        />
      </Box>
      <Box sx={styles.contentGrid}>
        {data.items.map((item, index) => (
          <Box key={`${item.title}-${index}`} sx={styles.contentItem}>
            <Typography variant="h6" sx={styles.itemTitle}>
              {item.title[locale]}
            </Typography>
            <TipTapContent data={item.description[locale]} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FundSummaryHeader;
