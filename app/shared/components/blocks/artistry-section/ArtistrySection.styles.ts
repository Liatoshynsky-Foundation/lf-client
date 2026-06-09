import { AppTypography } from '~/constants';
import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  mainContainer: {
    gridColumn: '1 / -1',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    zIndex: 0,
    marginRight: '-50vw',
    width: '100vw',
    backgroundColor: '#FCBD28',
    transform: 'skewY(-2deg)',
    transformOrigin: 'top left'
  },

  transformContainer: {
    maxWidth: '1728px',
    margin: '0 auto',
    transform: 'skewY(2deg)',
    transformOrigin: 'top left',
    padding: { xs: '45px 24px 65px', sm: '20px 56px 57px', md: '35px 72px 80px', xl: '40px 72px 100px' }
  },

  contentContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    ...commonSx.layout.standardGrid,
    width: '100%'
  },

  textStyle: {
    fontSize: commonSx.layout.typography.bodyMedium,
    lineHeight: { xs: '150%', md: '160%' },
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  },

  additionalTextStyle: {
    fontSize: commonSx.layout.typography.bodyMedium,
    lineHeight: { xs: '150%', md: '160%' },
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  },

  subTitle: {
    ...AppTypography.oswald28Bold,
    fontSize: { md: '42px', lg: '48px' },
    fontWeight: { md: 600 },
    lineHeight: { xs: '150%', md: '120%' },
    letterSpacing: '0%',
    textTransform: { xs: 'uppercase', md: 'none' },
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  },

  buttonStyle: {
    maxWidth: { xs: '247px' },
    minWidth: { xs: '247px' },
    '&:hover': {
      backgroundColor: '#292828',
      color: '#fff'
    }
  }
};
