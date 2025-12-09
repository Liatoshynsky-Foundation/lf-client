import { AppTypography } from '~/constants';

export const styles = {
  container: {
    height: '0%',
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    gridColumn: '1 / -1',
    mt: { xs: '80px', md: '172px', lg: '180px' },
    mb: { xs: '80px', sm: '104px', md: '128px', lg: '144px' },
    gridTemplateRows: 'auto auto'
  },
  subtitle: {
    ...AppTypography.oswald28Bold,
    fontSize: { xs: '20px', md: '28px' },
    color: '#190D03',
    letterSpacing: '0px',
    gridColumn: { xs: '2 / -1', sm: '4 / -1', md: '6 / -1' }
  },
  textAbove: {
    lineHeight: '160%',
    gridColumn: '1 / -1',
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
    },
    mt: { xs: '16px', md: '32px' }
  },
  text: {
    gridColumn: '1 / -1',
    mt: { xs: '16px', md: '32px' }
  },
  title: {
    alignSelf: 'start',
    mb: { sm: '0px', md: '34px' },
    gridColumn: { xs: '1 / -1', md: '1 / 3' },
    fontSize: { xs: '40px', md: '64px' }
  },
  textContainer: {
    gridColumn: { xs: '1 / -1', sm: '4 / 9', md: '6 / 13' },
    pt: { md: '10px' },
    mt: '32px'
  }
};
