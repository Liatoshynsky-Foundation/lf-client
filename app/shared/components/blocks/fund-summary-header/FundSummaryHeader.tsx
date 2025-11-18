import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import React from 'react';

import SectionTitle from '~/components/section-title/SectionTitle';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import CustomLink from '~/ds-components/link/CustomLink';

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
    <Box>
      <Box>
        <CustomLink path={backLinkUrl} startIcon={arrowBackIcon}>
          {backLinkText}
        </CustomLink>
      </Box>
      <SectionTitle title={title} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          mt: 4
        }}
      >
        {data.items.map((item, index) => (
          <Box
            key={`${item.title}-${index}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
