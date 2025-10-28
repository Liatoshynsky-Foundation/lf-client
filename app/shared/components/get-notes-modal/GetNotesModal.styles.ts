import { GetNotesState } from '~/types/enums/getNotes.enums';

export const styles = {
  backdrop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  paper: (state: GetNotesState) => {
    if (state === GetNotesState.LIST) {
      return {
        maxHeight: '95vh',
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
          sm: '48px',
          md: '64px 56px',
          xl: '72px'
        },
        '@media (max-width: 480px)': {
          height: 'calc(100vh - 24px)',
          width: '100vw'
        }
      };
    }

    return {
      maxHeight: '95vh',
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
        maxWidth: '100vw',
        maxHeight: '100vh'
      },
      '@media (min-width: 426px) and (max-width: 767px)': {
        maxWidth: 'min(90vw, 394px)'
      }
    };
  },
  headerSticky: (state: GetNotesState) => {
    if (state === GetNotesState.LIST) {
      return {};
    }

    return {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 2,
      backgroundColor: 'background.paper',
      paddingBottom: '8px'
    };
  },
  closeIcon: {
    width: '30px',
    height: '30px'
  },
  scrollContainer: (state: GetNotesState) => {
    if (state === GetNotesState.LIST) {
      return {};
    }

    return {
      overflowY: 'auto',
      flex: 1,
      maxHeight: 'calc(95vh - 200px)',
      paddingRight: '8px'
    };
  }
};
