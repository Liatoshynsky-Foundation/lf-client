import { Box, Button, SxProps, Theme, Typography, useMediaQuery } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { ArchiveRecord } from './documents.conts';
import { IconButtonColorVariant } from '~/types/enums/common.enums';

import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export const RenderCodeHeader = () => {
  const t = useTranslations('table.documents.columns');
  return (
    <Typography
      sx={{
        pl: {
          xs: '24px',
          sm: '56px',
          md: '72px'
        }
      }}
      variant="customBold16"
    >
      {t('code')}
    </Typography>
  );
};

export const RenderCodeCell = (info: CellContext<ArchiveRecord, unknown>) => (
  <Typography
    sx={{
      pl: {
        xs: '24px',
        sm: '40px',
        md: '72px'
      }
    }}
    variant="customMedium16"
  >
    {info.getValue<string>()}
  </Typography>
);

export const RenderNameHeader = () => {
  const t = useTranslations('table.documents.columns');
  return <Typography variant="customBold16">{t('name')}</Typography>;
};

export const RenderNameCell = (info: CellContext<ArchiveRecord, unknown>) => (
  <Typography className="name-cell" style={{ maxWidth: '192px' }} variant="customMedium16">
    {info.getValue<string>()}
  </Typography>
);

export const RenderDateHeader = () => {
  const t = useTranslations('table.documents.columns');
  return <Typography variant="customBold16">{t('date')}</Typography>;
};

export const RenderDateCell = (info: CellContext<ArchiveRecord, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const RenderSheetHeader = () => {
  const t = useTranslations('table.documents.columns');
  return <Typography variant="customBold16">{t('sheets')}</Typography>;
};

export const RenderSheetCell = (info: CellContext<ArchiveRecord, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const RenderContentHeader = () => {
  const t = useTranslations('table.documents.columns');
  return <Typography variant="customBold16">{t('content')}</Typography>;
};

export const RenderContentCell = (info: CellContext<ArchiveRecord, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const iconButtonSecondaryPlainSx: SxProps<Theme> = {
  bgcolor: 'none'
};

export const RenderActionCell = (info: CellContext<ArchiveRecord, unknown>) => {
  const t = useTranslations('table.documents.buttons');
  const row = info.row.original;
  const { isLaptop } = useBreakpoints();
  const isSmallDesktop = useMediaQuery('(min-width:1280px) and (max-width:1447px)');
  const isLargeDesktop = useMediaQuery('(min-width:1448px)');

  if (row.sheets !== null) {
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
        {isLargeDesktop && (
          <Button variant="outlined" size="medium" color="primary">
            {t('view')}
          </Button>
        )}
        {isSmallDesktop && (
          <Button variant="outlined" size="small" color="primary">
            {t('shortView')}
          </Button>
        )}
        {isLaptop && (
          <IconButton size="small" variant={IconButtonColorVariant.Secondary} sx={iconButtonSecondaryPlainSx}>
            <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
          </IconButton>
        )}
      </Box>
    );
  }

  return null;
};
