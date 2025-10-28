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
      '@media (max-height: 700px) and (max-width: 600px)': {
        maxHeight: '100vh',
        height: state === GetNotesState.LIST ? '100vh' : 'auto',
        overflowY: 'auto'
      }
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
          xs: '16px 20px 24px',
          sm: '48px',
          md: '64px 56px',
          xl: '72px'
        }
      };
    }

    return {
      ...shared,
      maxWidth: {
        xs: '100vw',
        sm: '394px',
        md: '496px',
        lg: '646px',
        xl: '744px',
        xxl: '772px'
      },
      padding: {
        xs: '51px 24px',
        sm: '50px 32px',
        md: '57px 53px',
        lg: '80px',
        xl: '75px 81px'
      },
      '@media (max-width: 425px)': {
        maxWidth: '100vw'
      },
      '@media (min-width: 426px) and (max-width: 767px)': {
        maxWidth: 'min(90vw, 394px)'
      },
      '@media (max-height: 800px)': {
        maxHeight: '100vh'
      },
      '@media (max-height: 680px)': {
        overflowY: 'auto'
      }
    };
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },

  closeIcon: {
    width: '30px',
    height: '30px'
  }
};
