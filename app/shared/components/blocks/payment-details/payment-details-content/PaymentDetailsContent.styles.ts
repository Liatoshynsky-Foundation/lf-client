const cell = {
  p: 0,
  border: 'none',
  textAlign: 'left',
  verticalAlign: 'top',
  overflowWrap: 'anywhere',
  wordBreak: 'break-word'
};

export const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    minWidth: 0,
    color: 'text.primary',
    overflowWrap: 'anywhere'
  },

  paragraph: {
    lineHeight: '150%',
    color: 'inherit',
    m: 0
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',

    '& tbody': {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  },

  row: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: '4px', sm: '24px' },
    width: '100%'
  },

  label: {
    ...cell,
    width: { xs: '100%', sm: '115px' },
    flexShrink: 0,
    color: 'brown.500',
    fontWeight: 'inherit'
  },

  value: {
    ...cell,
    flex: 1,
    minWidth: 0,
    color: 'text.primary'
  },

  copyLink: {
    gap: '8px',
    alignItems: 'flex-start',
    textAlign: 'left',
    color: 'text.primary',
    whiteSpace: 'normal',
    minWidth: 0,
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    '&:focus, &:focus-visible': {
      outline: '2px solid #631B2B',
      outlineOffset: '2px',
      borderRadius: '2px'
    }
  },

  copyIcon: {
    flexShrink: 0,
    mt: '4px'
  }
};
