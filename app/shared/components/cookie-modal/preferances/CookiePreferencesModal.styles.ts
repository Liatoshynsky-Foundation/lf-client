import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  container: {
    maxWidth: '632px',
    width: '100%',
    maxHeight: '399px',
    height: '100%'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  childrenBox: {
    height: '100%'
  },
  topSection: {
    marginBottom: '15px'
  },
  title: {
    fontSize: '20px',
    lineHeight: '140%',
    letterSppasing: 0,
    fontFamily: 'var(--font-mulish)',
    fontWeight: 700
  },
  description: {
    fontSize: '16px',
    lineHeight: '150%',
    letterSppasing: 0,
    fontFamily: 'var(--font-mulish)',
    fontWeight: 400,
    mb: '24px'
  },
  analyticsContainer: {
    border: `2px solid ${mainHexPallete.brown[100]}`,
    borderRadius: '8px',
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '7px'
  },
  analyticsDescriptioContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  analysticsDescription: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    letterSppasing: 0,
    fontFamily: 'var(--font-mulish)'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: '24px'
  }
};
