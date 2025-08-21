'use client';

import { Box, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import EyeIcon from 'public/icons/eye.svg';
import LogOut from 'public/icons/log-out.svg';

import Button from '~/ds-components/button/Button';
import { mainHexPallete } from '~/ds-components/theme/colors';

import type { WorkTable } from '~/types/types/enhancedTable';

export const RenderNameHeader = () => {
  const t = useTranslations('table.work.columns');
  return (
    <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
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

export const renderNameCell = (info: CellContext<WorkTable, unknown>) => (
  <Typography variant="customMedium16" sx={{ display: 'inline-block', maxWidth: '738px' }}>
    {info.getValue<string>()}
  </Typography>
);

export const renderAuthorCell = (info: CellContext<WorkTable, unknown>) => (
  <Typography variant="customMedium16" sx={{ maxWidth: '192px' }}>
    {info.getValue<string>()}
  </Typography>
);

export const renderYearCell = (info: CellContext<WorkTable, unknown>) => (
  <Typography variant="customMedium16" sx={{ display: 'inline-block', maxWidth: '85px' }}>
    {info.getValue<number>()}
  </Typography>
);

export const RenderActionCell = (info: CellContext<WorkTable, unknown>) => {
  const t = useTranslations('table.work.buttons');
  const row = info.row.original;

  if (row.actionType === 'pdf') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          maxWidth: '189px'
        }}
      >
        <Button variant="outlined" size="medium" color="primary" endIcon={<EyeIcon />}>
          {t('view')}
        </Button>
      </Box>
    );
  }

  if (row.actionType === 'link' && row.link) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          maxWidth: '189px'
        }}
      >
        <Button variant="outlined" size="medium" color="primary" link={row.link} endIcon={<LogOut />}>
          {t('goto')}
        </Button>
      </Box>
    );
  }

  return null;
};
