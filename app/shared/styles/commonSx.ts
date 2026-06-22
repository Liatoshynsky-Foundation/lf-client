import { SxProps, Theme } from '@mui/material';

type CommonSxStyles = {
  [key: string]: SxProps<Theme> | { [key: string]: SxProps<Theme> };
};

export const commonSx = {
  layout: {
    standardGrid: {
      gridTemplateColumns: {
        xs: 'repeat(4, 1fr)',
        sm: 'repeat(8, 1fr)',
        md: 'repeat(12, 1fr)'
      },
      columnGap: {
        xs: '16px',
        sm: '24px',
        md: '40px'
      }
    },
    textIndent: {
      textIndentThirdColumn: {
        xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
        sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
        md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
        xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
      },
      textIndentThirdColumnCompact: {
        xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
        sm: 'calc((100vw - 112px) / 8 * 3 - 14px)',
        md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
        xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
      },
      textIndentThirdColumnFromSm: {
        sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
        md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
        xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
      },
      textIndentThirdColumnNarrow: {
        xs: 'calc((100vw - 48px) / 4 * 1 + 6px)',
        sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
        md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
        xxl: 'calc((1448px - 144px) / 12 * 3 + 11px)'
      },
      textIndentFirstColumnNarrow: {
        xs: '0px',
        sm: 'calc((100vw - 112px) / 8 * 1 + 3px)',
        md: 'calc((100vw - 144px) / 12 * 1 + 40px)',
        lg: 'calc((1448px - 144px) / 12 * 1 + 3px)'
      }
    },
    typography: {
      heroTitle: { xs: '40px', md: '64px' },
      sectionTitle: { xs: '20px', md: '28px' },
      bodyLarge: { xs: '16px', md: '20px' },
      bodyMedium: { xs: '16px', md: '18px' }
    },
    activeTabIndicator: {
      height: 'calc(100% - 8px)',
      top: 4
    }
  }
} satisfies CommonSxStyles;
