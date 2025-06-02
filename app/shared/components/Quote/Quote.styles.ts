import { Color } from './Quote';

type StylesProps = {
  quoteIconColor?: Color;
  mainTextColor?: Color;
  alignRight?: boolean;
};

export const colorMap = {
  burgundy: '#600E0F',
  black: '#190D03'
};

export const styles = (props: StylesProps) => {
  const { quoteIconColor = 'burgundy', mainTextColor = 'burgundy', alignRight = true } = props;

  const alignItemsValue = alignRight ? 'flex-start' : 'flex-end';
  const textAlignValue = alignRight ? 'left' : 'right';

  return {
    quoteWrapper: {
      display: 'flex',
      alignItems: alignItemsValue,
      flexDirection: 'column',
      width: { xs: '241px', sm: '231px', md: '305px', lg: '367px', xl: '408px' },
      height: { xs: '279px', sm: '293px', md: '315px', lg: '266px', xl: '266px' },
      top: '478px',
      left: '72px',
      gap: '40px'
    },
    quoteIcon: {
      width: { xs: '50px', sm: '60px' },
      height: '50px',
      color: colorMap[quoteIconColor],
      transform: alignRight ? 0 : 'scaleX(-1)'
    },
    textBlocksContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: alignItemsValue,
      width: { xs: '241px', sm: '231px', md: '305px', lg: '367px', xl: '408px' },
      gap: { xs: '16px', md: '24px' }
    },
    mainQuoteText: {
      fontFamily: 'Mulish',
      fontWeight: 500,
      fontSize: { xs: '16px', md: '18px' },
      color: colorMap[mainTextColor],
      mb: 2,
      textAlign: textAlignValue,
      letterSpacing: 0
    },
    sourceText: {
      fontFamily: 'Mulish',
      fontWeight: 500,
      fontSize: { xs: '14px', md: '16px' },
      fontStyle: 'italic',
      color: '#52545A',
      textAlign: textAlignValue,
      letterSpacing: 0
    }
  };
};
