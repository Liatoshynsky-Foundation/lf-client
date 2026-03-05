import { mainHexPallete } from '../theme/colors';
import { Color, HorizontalAlignment, VerticalAlignment } from './Modal';
import { PositionEnum } from '~/types/enums/common.enums';

const titleColor = (backgroundColor: Color) => (backgroundColor === 'white' ? 'black' : 'white');

const windowMargin = { xs: '24px', sm: '32px', md: '48px' };

const verticalPositionStyles = (verticalAlignment: VerticalAlignment) => {
  if (verticalAlignment === PositionEnum.Top) {
    return { top: 0, bottom: 'revert-layer', mt: windowMargin, mb: windowMargin };
  } else if (verticalAlignment === PositionEnum.Bottom) {
    return { bottom: 0, top: 'revert-layer', mt: windowMargin, mb: windowMargin };
  } else {
    return { top: '35%', my: '0' };
  }
};

const horizontalPositionStyles = (horizontalAlignment: HorizontalAlignment) => {
  if (horizontalAlignment === PositionEnum.Left) {
    return { left: 0, ml: windowMargin, mr: windowMargin };
  } else if (horizontalAlignment === PositionEnum.Right) {
    return { right: 0, ml: windowMargin, mr: windowMargin };
  } else {
    return { left: '50%', marginLeft: '0', transform: 'translateX(-50%)' };
  }
};

export const style = {
  modal: (
    width: number,
    height: number | undefined,
    backgroundColor: Color,
    verticalAlignment: VerticalAlignment,
    horizontalAlignment: HorizontalAlignment
  ) => ({
    width: { xs: 'calc(100% - 48px)', sm: width },
    height: { xs: 'fit-content', sm: height ?? 'fit-content' },
    backgroundColor: backgroundColor === 'white' ? backgroundColor : mainHexPallete.burgundy[900],
    borderRadius: '32px',
    outline: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    '&:focus': { outline: 'none' },
    padding: width > 1000 ? '40px 110px' : '24px 32px',
    ...verticalPositionStyles(verticalAlignment),
    ...horizontalPositionStyles(horizontalAlignment)
  }),
  content: {
    outline: 'none',
    border: 'none',
    padding: '0',
    display: 'flex',
    flexDirection: 'column'
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: 'none',
    marginBottom: '60px'
  },
  title: (backgroundColor: Color) => ({
    color: titleColor(backgroundColor)
  }),
  topLine: (width: number) => ({
    width: width,
    marginLeft: width > 1000 ? '-110px' : '-32px',
    marginBottom: '20px',
    height: '2px',
    backgroundColor: '#FFBC21',
    transform: 'rotate(-2deg)',
    transformOrigin: 'left center'
  }),
  children: {
    justifyContent: 'center'
  }
};
