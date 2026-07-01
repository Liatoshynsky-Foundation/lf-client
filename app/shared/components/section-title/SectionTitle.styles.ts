import { AppTypography } from '~/constants';
import { commonSx } from '~/shared/styles/commonSx';

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
    gridTemplateColumns: {
      xs: 'repeat(3, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
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
  title: (gridColumn?: object) => ({
    ...AppTypography.oswald28Bold,
    fontSize: commonSx.layout.typography.sectionTitle,
    color: 'black',
    letterSpacing: '0px',
    gridColumn: gridColumn ?? { xs: '2 / -1', sm: '4 / -1', md: '6 / -1' }
  })
};
