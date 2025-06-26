import { mainHexPallete } from '../theme/colors';
import { Color, HorizontalAlignment, VerticalAlignment } from './Modal';
import { PositionEnum } from '~/types/enums/common.enums';

const titleColor = (backgroundColor: Color) => (backgroundColor === 'white' ? 'black' : 'white');

const verticalPositionStyles = (verticalAlignment: VerticalAlignment) =>
  verticalAlignment === PositionEnum.Top
    ? { top: 0, marginTop: '20px' }
    : verticalAlignment === PositionEnum.Bottom
      ? { top: 'revert-layer', marginBottom: '20px' }
      : { top: '35%', my: '0' };

const horizontalPositionStyles = (horizontalAlignment: HorizontalAlignment) =>
  horizontalAlignment === PositionEnum.Left
    ? { left: 0 }
    : horizontalAlignment === PositionEnum.Right
      ? { right: 0 }
      : { left: '50%', marginLeft: '0', transform: 'translateX(-50%)' };

export const style = {
  modal: (
    width: number,
    height: number | undefined,
    backgroundColor: Color,
    verticalAlignment: VerticalAlignment,
    horizontalAlignment: HorizontalAlignment
  ) => ({
    width: width,
    height: height ? height : 'fit-content',
    backgroundColor: backgroundColor === 'white' ? backgroundColor : mainHexPallete.burgundy[900],
    margin: '50px',
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
    flexDirection: 'column',
    height: '100%'
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: 'none',
    padding: '0 20px',
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
    justifyContent: 'center',
    padding: '0 20px'
  }
};
