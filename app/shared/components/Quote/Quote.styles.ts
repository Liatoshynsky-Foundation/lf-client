import { ImageColor, TextColor } from './Quote';

type StylesProps = {
  quoteIconColor?: ImageColor;
  mainTextColor?: TextColor;
  sourceTextColor?: TextColor;
  alignRight?: boolean;
};

export const colorMap = {
  burgundy: '#600E0F',
  gray: '#52545A',
  black: '#190D03'
};

export const styles = (props: StylesProps) => {
  const {
    quoteIconColor = 'burgundy',
    mainTextColor = 'burgundy',
    sourceTextColor = 'gray',
    alignRight = true
  } = props;

  const alignItemsValue = alignRight ? 'flex-end' : 'flex-start';
  const textAlignValue = alignRight ? 'right' : 'left';

  return {
    quoteWrapper: {
      display: 'flex',
      alignItems: alignItemsValue,
      flexDirection: 'column',
      width: '408px',
      top: '478px',
      left: '72px',
      gap: '40px'
    },
    quoteIcon: {
      width: { xs: '50px', sm: '60px' },
      height: '50px',
      color: colorMap[quoteIconColor],
      transform: alignRight ? 'scaleX(-1)' : 0
    },
    textBlocksContainer: {
      alignItems: alignItemsValue
    },
    mainQuoteText: {
      fontFamily: 'Mulish',
      fontWeight: 500,
      fontSize: '18px',
      color: colorMap[mainTextColor],
      mb: 2,
      textAlign: textAlignValue,
      letterSpacing: 0
    },
    sourceText: {
      fontFamily: 'Mulish',
      fontWeight: 500,
      fontSize: '16px',
      fontStyle: 'italic',
      color: colorMap[sourceTextColor],
      textAlign: textAlignValue,
      letterSpacing: 0
    }
  };
};
