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
    gap: { xs: '20px', sm: '24px', md: '40px' },
    alignItems: 'start',
    height: '100%'
  },

  buttonBox: (gridColumn: object, button: object | string) => ({
    gridArea: 'buttons',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifySelf: 'start',
    gridColumn: gridColumn,
    height: 'calc(100% - 40px)',
    justifyContent: 'flex-end',
    width: button
  }),
  button: {
    alignSelf: 'end',
    px: 0,
    ':hover': {
      backgroundColor: mainHexPallete.yellow[500],
      color: '#000'
    }
  },

  icon: {
    display: 'flex',
    alignItems: 'center'
  },

  contentBox: {
    gridArea: 'content',
    gridColumn: { xs: '1/9', sm: '1 / 16', md: '1 / 13' },
    width: '100%'
  }
};
