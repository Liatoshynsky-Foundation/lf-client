export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '3px solid rgba(217, 220, 232, 0.4)',
    padding: {
      xs: '10px 0',
      md: '24px 0'
    },
    gap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    }
  },
  leftBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minWidth: 0,
    flex: 1
  },
  notesTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: 0
  },
  notesTitle: {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    minWidth: 0,
    fontSize: '16px'
  },
  dateMobile: {
    color: '#9E9E9E',
    fontSize: '14px',
    display: { xs: 'block', md: 'none' }
  },
  dateDesktop: {
    fontSize: '16px',
    display: { xs: 'none', md: 'block' },
    marginRight: '12px'
  }
};
