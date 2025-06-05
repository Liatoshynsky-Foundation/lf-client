import { AppTypography } from '~/constants';

export const imageSizes = (isLaptopAndAbove: boolean) => {
  return isLaptopAndAbove
    ? {
        width: 32,
        height: 30
      }
    : {
        width: 22,
        height: 20
      };
};

export const styles = {
  container: (mb?: number | string) => ({
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    alignItems: 'center',
    mb: `${mb ?? 72}px`
  }),
  title: {
    ...AppTypography.oswald28Bold,
    fontSize: { xs: '20px', md: '28px' },
    color: '#190D03',
    letterSpacing: '0px',
    gridColumn: { xs: '2 / -1', sm: '4 / -1', md: '6 / -1' }
  }
};
