import { GetNotesState } from '~/types/enums/getNotes.enums';

export const styles = {
  backdrop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  maxWidth: (state: number) => {
    if (state === GetNotesState.LIST) {
      return {
        maxWidth: 'min(70vw, 1024px)'
      };
    }

    return {
      maxWidth: {
        xs: '90vw',
        sm: 'min(85vw, 600px)',
        md: 'min(70vw, 744px)'
      }
    };
  },
  paper: (state: number) => {
    if (state === GetNotesState.LIST) {
      return {
        maxHeight: '95vh',
        padding: {
          xs: '16px 20px 24px',
          sm: '24px 32px 32px',
          md: '20px 56px 56px'
        },
        minWidth: {
          xs: '95vw',
          sm: 'min(90vw, 900px)',
          md: 'min(70vw, 726px)',
          lg: 'min(70vw, 1024px)'
        },
        '@media (max-height: 800px) and (max-width:600px)': {
          height: 'calc(100vh - 32px)',
          overflowY: 'auto'
        }
      };
    }

    return {
      maxHeight: '95vh',
      padding: {
        xs: '16px 24px 24px',
        sm: '24px 48px 48px',
        md: '72px'
      },
      minWidth: {
        xs: '90vw',
        sm: 'min(85vw, 600px)',
        md: 'min(70vw, 744px)'
      },
      '@media (max-height: 800px) and (max-width:600px)': {
        height: 'calc(100vh - 32px)',
        overflowY: 'auto'
      }
    };
  },

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginBottom: '8px'
  },
  closeIcon: {
    width: '30px',
    height: '30px'
  }
};
