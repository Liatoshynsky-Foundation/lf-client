import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  container: {
    maxWidth: '632px',
    height: '100%'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  childrenBox: {
    flexGrow: 1
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
    flexDirection: { xs: 'column', sm: 'row' },
    mt: '24px',
    gap: '8px',
    padding: '16px 8px'
  }
};
