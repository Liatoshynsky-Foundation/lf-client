export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 2fr',
    alignItems: 'center',
    borderBottom: 2,
    borderColor: '#E2E6EC',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  filenameWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icon: {
    marginRight: '10px'
  },
  name: {
    maxWidth: '300px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  text: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: 0
  },
  dateWrapper: {
    justifySelf: 'center'
  },
  btnWrapper: {
    justifySelf: 'end'
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px'
  }
};
