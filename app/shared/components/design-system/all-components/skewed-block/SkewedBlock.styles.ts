export const styles = {
  mainContainer: {
    transform: 'skewY(-2deg)',
    gridColumn: '1 / -1',
    marginBotton: '100px',
    position: 'relative',
    left: '50%',
    marginLeft: '-50vw',
    width: '100vw'
  },
  caption: (align: 'left' | 'right') => ({
    fontSize: { xs: '12px', sm: '14px', md: '16px' },
    textAlign: align,
    color: 'blue.700',
    gridColumn: '1 / -1',
    transform: 'skewY(2deg)',
    paddingRight: '24px',
    mt: '8px',
    display: 'block'
  })
};
