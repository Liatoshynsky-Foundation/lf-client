import { AppTypography } from '~/constants';

export const imageSizes = {
  width: {
    xs: 22,
    md: 32
  },
  height: {
    xs: 20,
    md: 30
  }
};

export const styles = {
  container: (mb?: number | string) => ({
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    alignItems: 'center',
    mb: `${mb ?? 72}px`
  }),
  image: {
    position: 'relative',
    width: {
      xs: '22px',
      md: '32px'
    },
    height: {
      xs: '20px',
      md: '30px'
    }
  },
  title: {
    ...AppTypography.oswald28Bold,
    fontSize: { xs: '20px', md: '28px' },
    color: '#190D03',
    letterSpacing: '0px',
    gridColumn: { xs: '3 / -1', sm: '5 / -1', md: '6 / -1' }
  }
};
