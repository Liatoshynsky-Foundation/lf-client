export const styles = {
  controls: (isMobile: boolean) => ({
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '4px'
  }),
  backgroundContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    maxHeight: '52px',
    borderRadius: '40px',
    border: '6px solid ',
    borderColor: 'white',
    gap: '16px'
  }
};
