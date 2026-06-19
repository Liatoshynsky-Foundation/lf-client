import { AppTypography } from '~/constants';
import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  container: {
    height: '0%',
    display: 'grid',
    ...commonSx.layout.standardGrid,
    gridColumn: '1 / -1',
    mt: { xs: '80px', md: '172px', lg: '180px' },
    mb: { xs: '80px', sm: '104px', md: '128px', lg: '144px' },
    gridTemplateRows: 'auto auto'
  },
  subtitle: {
    ...AppTypography.oswald28Bold,
    fontSize: commonSx.layout.typography.sectionTitle,
    color: '#190D03',
    letterSpacing: '0px',
    gridColumn: { xs: '2 / -1', sm: '4 / -1', md: '6 / -1' }
  },
  textAbove: {
    lineHeight: '160%',
    gridColumn: '1 / -1',
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
    mt: { xs: '16px', md: '32px' }
  },
  text: {
    gridColumn: '1 / -1',
    mt: { xs: '16px', md: '32px' }
  },
  title: {
    alignSelf: 'start',
    mb: { sm: '0px', md: '34px' },
    gridColumn: { xs: '1 / -1', md: '1 / 3' },
    fontSize: commonSx.layout.typography.heroTitle
  },
  textContainer: {
    gridColumn: { xs: '1 / -1', sm: '4 / 9', md: '6 / 13' },
    pt: { md: '10px' },
    mt: '32px'
  }
};
