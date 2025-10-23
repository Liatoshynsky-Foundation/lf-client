import { GetNotesState } from '~/types/enums/getNotes.enums';

export const styles = {
  backdrop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  maxWidth: (state: number) => {
    switch (state) {
      case GetNotesState.LIST:
        return {
          width: '1000px',
          maxWidth: 'min(70vw, 1000px)'
        };
      case GetNotesState.FORM:
      case GetNotesState.CONFIRM:
        return {
          maxWidth: {
            xs: '90vw',
            sm: 'min(85vw, 600px)',
            md: 'min(70vw, 744px)'
          }
        };
    }
  },
  paper: {
    maxHeight: '95vh',
    minHeight: '475px',
    padding: {
      xs: '16px 24px 24px 24px',
      sm: '24px 48px 48px 48px',
      md: '32px 72px 72px 72px'
    },
    minWidth: 'min(40vw, 768px)'
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
