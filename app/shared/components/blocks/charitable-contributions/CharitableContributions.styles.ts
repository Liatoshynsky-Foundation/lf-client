export const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    pb: '40px'
  },

  contributions: {
    containerSx: {
      marginBottom: '16px',
      gridTemplateRows: { xs: 'auto auto', customXS: 'auto' },
      gap: { xs: '16px', lg: '40px' }
    },
    textSx: {
      textIndent: '80px',
      gridRow: { xs: 2, customxs: 1 },
      gridColumn: { xs: '1 / -1', customxs: '1 / -1' }
    },
    titleGridColumn: { xs: '1 / -1', customxs: '2 / -1', sm: '4 / -1', md: '6 / -1' }
  },

  buttonContent: {
    buttonProps: {
      buttonWidth: '248px',
      contentTextGridColumn: { xs: '1 / -1', sm: '4 / -1', md: '6 / -1' },
      buttonGridColumn: { xs: '1 / -1', customxs: '2/6', sm: '5/12', md: '2 / 6', lg: '3/6', xl: '3/6' },
      ml: { xs: 0, md: '20px', lg: '10px', xl: '45px', xxl: '115px' },
      textIndentation: {
        xs: 'clamp(80px, calc(-0.42rem + 4vw), 410px)',
        sm: 'clamp(232px, calc(-0.42rem + 4vw), 410px)',
        lg: 'clamp(295px, calc(-0.42rem + 4vw), 410px)',
        xl: 'clamp(335px, calc(-0.42rem + 4vw), 410px)',
        xxl: 'clamp(410px, calc(-0.42rem + 4vw), 410px)'
      },
      contentTextSx: { fontSize: { xs: '16px', md: '20px' }, marginRight: '25px' }
    }
  },

  contentWithTitle: {
    contentSx: {
      textIndent: {
        xs: 'clamp(80px, calc(-0.42rem + 4vw), 410px)',
        sm: 'clamp(232px, calc(-0.42rem + 4vw), 410px)',
        lg: 'clamp(290px, calc(-0.42rem + 4vw), 410px)',
        xl: 'clamp(335px, calc(-0.42rem + 4vw), 410px)',
        xxl: 'clamp(410px, calc(-0.42rem + 4vw), 410px)'
      }
    }
  }
};
