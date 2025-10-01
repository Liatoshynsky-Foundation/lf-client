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
          maxWidth: 'min(70vw, 744px)'
        };
    }
  },
  paper: {
    maxHeight: '80vh',
    minHeight: '475px',
    padding: '32px 72px 72px 72px'
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
