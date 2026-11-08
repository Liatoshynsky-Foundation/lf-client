'use client';

import { Box, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import LogOut from 'public/icons/log-out.svg';

import Button from '~/ds-components/button/Button';
import { mainHexPallete } from '~/ds-components/theme/colors';

import TipTapContent from '../../tip-tap-content/TipTapContent';
import { IconButtonColorVariant } from '~/types/enums/common.enums';

import { ResearchWorkTableRow } from '~/domain/dto/researchWorks.dto';
import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export const RenderNameHeader = () => {
  const t = useTranslations('table.work.columns');
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        cursor: 'pointer',
        pl: {
          xs: '24px',
          sm: '56px',
          md: '72px'
        }
      }}
    >
      <Typography variant="customBold16" color={mainHexPallete.blue[700]}>
        {t('name')}
      </Typography>
    </Box>
  );
};

export const RenderYearHeader = () => {
  const t = useTranslations('table.work.columns');
  return (
    <Typography variant="customBold16" color={mainHexPallete.blue[700]}>
      {t('year')}
    </Typography>
  );
};

export const renderNameCell = (info: CellContext<ResearchWorkTableRow, unknown>) => (
  <Box
    sx={{
      pl: { xs: '24px', sm: '56px', md: '72px' },
      pr: '40px',
      '& p': {
        typography: 'customMedium16'
      }
    }}
  >
    <TipTapContent data={info.row.original.name} />
  </Box>
);

export const renderYearCell = (value: string | number) => (
  <Typography variant="customMedium16" sx={{ display: 'inline-block' }}>
    {value}
  </Typography>
);

export const RenderActionCell = (info: CellContext<ResearchWorkTableRow, unknown>) => {
  const t = useTranslations('table.work.buttons');
  const row = info.row.original;
  const link = row.url ?? row.pdfFile?.url;
  const { isMobile, isTablet } = useBreakpoints();

  const isSmallScreen = isMobile || isTablet;

  if (link) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          pr: {
            xs: '24px',
            sm: '56px',
            md: '72px'
          }
        }}
      >
        {isSmallScreen ? (
          <IconButton size="small" variant={IconButtonColorVariant.Primary} sx={{ border: '1px solid black' }}>
            <SvgImage src="/icons/log-out.svg" alt={t('goto')} width={24} height={24} />
          </IconButton>
        ) : (
          <Button variant="outlined" size="medium" color="primary" externalLink={true} link={link} endIcon={<LogOut />}>
            {t('goto')}
          </Button>
        )}
      </Box>
    );
  }

  return null;
};
