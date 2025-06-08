const baseStyles = {
  progressLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
    transition: 'width 0.2s linear',
    pointerEvents: 'none'
  },
  progressThumb: {
    position: 'absolute',
    top: 3,
    transform: 'translate(-75%, -50%)',
    pointerEvents: 'none',
    transition: 'left 0.2s linear'
  }
};

export const styles = {
  popoverPaper: {
    backgroundColor: '#2b2b2b',
    color: 'white',
    borderRadius: '16px',
    padding: '16px',
    minWidth: 320,
    maxWidth: '370px',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2
  },
  timeText: {
    fontSize: '14px',
    opacity: 0.7,
    whiteSpace: 'nowrap'
  },
  trackText: {
    fontSize: '16px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    textAlign: 'right'
  },
  progressBar: {
    position: 'relative',
    width: '100%',
    height: 2,
    backgroundColor: '#666',
    borderRadius: 2,
    cursor: 'pointer',
    marginTop: 1,
    marginBottom: 1
  },
  progressLine: (progress: number) => ({
    ...baseStyles.progressLine,
    width: `${progress * 100}%`
  }),
  progressThumbSvg: (progress: number) => ({
    ...baseStyles.progressThumb,
    left: `${progress * 100}%`
  }),
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    marginTop: 1
  },
  playPauseButton: {
    backgroundColor: 'white',
    borderRadius: '50%',
    width: 40,
    height: 40,
    padding: 0,
    '& img': {
      width: 16,
      height: 16
    },
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  allTracksButton: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '24px',
    textTransform: 'none',
    fontWeight: 500,
    height: 40,
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  errorMessage: {
    padding: '16px',
    textAlign: 'center',
    fontWeight: 'bold'
  }
};
