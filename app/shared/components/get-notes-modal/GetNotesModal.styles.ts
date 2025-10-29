import { GetNotesState } from '~/types/enums/getNotes.enums';

export const styles = {
  backdrop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  paper: (state: GetNotesState) => {
    const shared = {
      maxHeight: '95vh',
      position: 'relative'
    };

    if (state === GetNotesState.LIST) {
      return {
        ...shared,
        maxWidth: {
          xs: '100vw',
          sm: '482px',
          md: '744px',
          xl: '1024px'
        },
        minWidth: {
          xs: '95vw',
          sm: 'min(90vw, 482px)',
          md: 'min(70vw, 744px)',
          xl: 'min(70vw, 1024px)'
        },
        padding: {
          xs: '40px 24px',
          sm: '24px 30px',
          md: '24px 56px',
          xl: '37px 60px'
        },
        '@media (max-width: 480px)': {
          height: 'calc(100vh - 24px)',
          width: '100vw'
        }
      };
    }

    return {
      ...shared,
      maxWidth: {
        xs: '100vw',
        sm: '394px',
        md: '496px',
        xl: '744px'
      },
      padding: {
        xs: '51px 24px',
        sm: '50px 32px',
        md: '57px 53px',
        xl: '75px 81px'
      },
      '@media (max-width: 425px)': {
        maxWidth: '100vw',
        maxHeight: '100vh'
      },
      '@media (min-width: 426px) and (max-width: 767px)': {
        maxWidth: 'min(90vw, 394px)'
      }
    };
  },
  closeIcon: (state: GetNotesState) => {
    const shared = {
      position: 'absolute',
      width: '30px',
      height: '30px'
    };

    if (state === GetNotesState.LIST) {
      return {
        ...shared,
        top: {
          xs: '-20px',
          sm: 0,
          xl: '-24px'
        },
        right: 0
      };
    }

    return {
      ...shared,
      top: {
        xs: '-30px',
        sm: '-45px',
        xl: '-45px'
      },
      right: {
        xs: 0,
        sm: '-24px'
      },
      '@media (max-height: 780px)': {
        top: 0,
        right: 0
      }
    };
  },
  scrollContainer: (state: GetNotesState) => {
    if (state === GetNotesState.LIST) return {};

    const base = {
      overflowY: 'auto',
      flex: 1,
      maxHeight: 'calc(95vh - 200px)'
    };

    if (state === GetNotesState.CONFIRM) {
      return {
        ...base,
        '@media (min-height: 700px)': {
          overflowY: 'hidden',
          maxHeight: '95vh'
        }
      };
    }

    return base;
  }
};
