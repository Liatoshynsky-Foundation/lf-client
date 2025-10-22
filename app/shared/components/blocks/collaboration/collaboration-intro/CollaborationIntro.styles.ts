import { AppTypography } from '~/constants';

export const styles = {
  container: {
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
    mt: '120px'
  },
  subtitle: {
    ...AppTypography.oswald28Bold,
    fontSize: { xs: '20px', md: '28px' },
    color: '#190D03',
    letterSpacing: '0px',
    gridColumn: { xs: '2 / -1', sm: '4 / -1', md: '6 / -1' }
  },
  text: (isFirst: boolean) => ({
    gridColumn: '6 / -1',
    textIndent: isFirst ? { xs: '3.7em', sm: '17em' } : '0',
    mt: { xs: '16px', md: '32px' }
  }),
  title: {
    mb: '34px',
    gridColumn: { xs: '1 / -1', md: '1 / 3' },
    fontSize: { xs: '40px', md: '64px' }
  },
  textContainer: {
    gridColumn: { xs: '1 / -1', sm: '4 / 9', md: '6 / 13' },
    mt: '16px'
  }
};
