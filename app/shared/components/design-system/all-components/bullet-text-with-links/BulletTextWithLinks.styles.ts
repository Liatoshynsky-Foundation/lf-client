export const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(4,1fr)', sm: 'repeat(8, 1fr)', md: 'repeat(12, 1fr)' },
    gridColumn: '1 / -1',
    gridTemplateAreas: {
      xs: ' "image"  "content" "buttons"',
      sm: '"buttons content" '
    },
    columnGap: { xs: '20px', sm: '23px', md: '40px' },
    rowGap: { xs: '13px', sm: '17px', md: '20px' },
    alignItems: 'start',
    height: 'fit-content'
  },

  buttonBox: {
    gridArea: 'buttons',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '8px', sm: '16px' },
    justifySelf: 'end',
    gridColumn: { xs: '1/ -1', sm: '1/4', md: '1 / 6' },
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    marginBottom: { xs: '10px', sm: 0 },
    marginTop: { xs: '4px', sm: 0 }
  },

  button: {
    alignSelf: { xs: 'start', sm: 'end' },
    maxWidth: { xs: 'fit-content', sm: '250px' }
  },

  icon: {
    display: 'flex',
    alignItems: 'center'
  },

  contentBox: {
    gridArea: 'content',
    gridColumn: { xs: '1/ -1', sm: '1 / 9', md: '1 / 13' },
    width: '100%'
  },

  image: {
    gridArea: 'image',
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

  buttonsBox: {
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: { xs: '8px', md: '16px' }
  }
};
