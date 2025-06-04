export const styles = {
  selectedButton: {
    position: 'absolute',
    top: 2,
    height: 'calc(100% - 4px)',
    backgroundColor: '#190D03',
    borderRadius: '9999px',
    transition: 'all 0.3s ease',
    zIndex: 0
  },
  defaultButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    backgroundColor: '#f0f0f0',
    padding: '8px',
    position: 'relative', // Container must be relative.
    overflow: 'hidden' // So the indicator doesn't spill out.
  },
  defaultButton: {
    display: 'inline-block',
    borderRadius: '9999px',
    color: '#190D03',
    cursor: 'pointer',
    position: 'relative', // Place buttons on top of the indicator.
    zIndex: 1,
    marginRight: '4px',
    padding: '1px 16px',
    '&:last-child': {
      marginRight: 0 // Remove margin for the last button
    }
  }
};
