import { theme } from '~/ds-components/theme/Theme';

export const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputs: {
    width: '100%',
    marginBottom: '32px'
  },
  firstRow: {
    width: '100%',
    display: 'flex',
    gap: '16px',
    paddingBottom: '8px'
  },
  inputBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: '100%',
    marginBottom: '8px'
  },
  info: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '12px',
    color: theme.palette.text.secondary
  },
  btn: {
    marginBottom: '8px'
  },
  hint: {
    fontWeight: 400,
    fontStyle: 'Italic',
    fontSize: '14px',
    lineHeight: '140%',
    color: theme.palette.text.secondary
  }
};
