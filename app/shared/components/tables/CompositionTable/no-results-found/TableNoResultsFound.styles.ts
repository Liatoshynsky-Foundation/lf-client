import { AppTypography } from '~/constants';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: 6,
    p: 0,
    mb: 10,
    width: { xs: '92vw', md: '89vw' },
    minHeight: '300px',
    textAlign: 'center'
  },
  image: {
    position: 'relative',
    width: { xs: 171, sm: 171, md: 248, lg: 248, xl: 248 },
    height: { xs: 114, sm: 114, md: 180, lg: 180, xl: 180 },
    mt: { md: '55px', lg: '80px', xl: '70px' },
    mr: { xl: '20px' },
    ml: { sm: '10px', md: '75px', lg: '140px', xl: '0px' }
  },
  description: {
    ...AppTypography.mulish16Medium,
    mt: 2,
    width: { xs: 272, sm: 350, md: 460 },
    height: { xs: 72, sm: 48 },
    ml: { sm: '10px', md: '90px', lg: '140px', xl: '0px' },
    letterSpacing: '0%',
    color: 'brown.800'
  },
  h4: {
    fontSize: { xs: 40, sm: 40, md: 48, lg: 48, xl: 48 },
    ml: { sm: '40px', md: '90px', lg: '160px', xl: '0px' }
  }
};

export default styles;
