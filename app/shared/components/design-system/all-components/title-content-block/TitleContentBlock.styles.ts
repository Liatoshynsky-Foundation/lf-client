import { AppTypography } from '~/constants';

export const styles = {
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(4,1fr)', sm: 'repeat(8, 1fr)', md: 'repeat(12, 1fr)' },
    gridColumn: '1 / -1',
    columnGap: { xs: '16px', sm: '24px', md: '40px' },
    rowGap: { xs: '24px' }
  },
  title: {
    ...AppTypography.mulish24Bold,
    gridColumn: { xs: '1/-1', sm: '1/3', md: '1/6', lg: '1/6' },
    textTransform: 'uppercase',
    fontSize: { xs: '20px', md: '26px' },
    lineHeight: '150%'
  },
  contentBlock: {
    gridColumn: { xs: '1 / -1', sm: '4 / 9', md: '6 / 13' }
  },
  textStyle: {
    gridColumn: '1 / -1',
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 14px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
    }
  }
};
