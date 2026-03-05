import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';

export const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(4,1fr)', sm: 'repeat(8, 1fr)', md: 'repeat(12, 1fr)' },
    gridColumn: '1 / -1',
    gridTemplateAreas: {
      xs: '"content" "buttons"',
      md: '"buttons content"'
    },
    columnGap: { sm: '20px', md: '40px' },
    alignItems: 'start'
  },

  buttonBox: {
    gridArea: 'buttons',
    display: {
      xs: 'flex',
      sm: 'block',
      md: 'flex'
    },
    flexDirection: { md: 'column' },
    gap: 2,
    justifySelf: 'start',
    gridColumn: { xs: '1/-1', sm: '4/-1', md: '3 / 6' },
    height: '100%',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'flex-end'
  },

  button: {
    alignSelf: 'end',
    px: 0,
    '& hover': {
      backgroundColor: mainHexPallete.yellow[500],
      color: '#FFF'
    }
  },

  icon: {
    display: 'flex',
    alignItems: 'center'
  },

  contentBox: {
    gridArea: 'content',
    gridColumn: { xs: '1/-1', sm: '1 / 9', md: '1 / 13' },
    width: '100%'
  }
};
