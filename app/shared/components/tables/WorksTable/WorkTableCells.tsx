'use client';

import { Box, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import EyeIcon from 'public/icons/eye.svg';
import LogOut from 'public/icons/log-out.svg';

import Button from '~/ds-components/button/Button';
import { mainHexPallete } from '~/ds-components/theme/colors';

import { WorkTableUI } from './WorkTableSelection';
import { IconButtonColorVariant } from '~/types/enums/common.enums';

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

export const RenderAuthorHeader = () => {
  const t = useTranslations('table.work.columns');
  return (
    <Typography variant="customBold16" color={mainHexPallete.blue[700]}>
      {t('author')}
    </Typography>
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

export const renderNameCell = (info: CellContext<WorkTableUI, unknown>) => (
  <Typography
    variant="customMedium16"
    sx={{
      display: 'inline-block',
      pl: {
        xs: '24px',
        sm: '56px',
        md: '72px'
      },
      pr: '40px'
    }}
  >
    {info.getValue<string>()}
  </Typography>
);

export const renderAuthorCell = (info: CellContext<WorkTableUI, unknown>) => (
  <Typography variant="customMedium16" sx={{ maxWidth: '192px' }}>
    {info.getValue<string>()}
  </Typography>
);

export const renderYearCell = (value: string | number) => (
  <Typography variant="customMedium16" sx={{ display: 'inline-block' }}>
    {value}
  </Typography>
);

export const RenderActionCell = (info: CellContext<WorkTableUI, unknown>) => {
  const t = useTranslations('table.work.buttons');
  const row = info.row.original;
  const { isMobile, isTablet } = useBreakpoints();

  const isSmallScreen = isMobile || isTablet;

  if (row.isPreview) {
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
            <SvgImage src="/icons/eye.svg" alt={t('view')} width={24} height={24} />
          </IconButton>
        ) : (
          <Button variant="outlined" size="medium" color="primary" endIcon={<EyeIcon />}>
            {t('view')}
          </Button>
        )}
      </Box>
    );
  }

  if (row.url) {
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
          <Button variant="outlined" size="medium" color="primary" link={row.url} endIcon={<LogOut />}>
            {t('goto')}
          </Button>
        )}
      </Box>
    );
  }

  return null;
};
