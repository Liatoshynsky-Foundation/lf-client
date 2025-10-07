import { mainHexPallete } from '../theme/colors';
import { BorderParams } from './ImageWithBorder';

export const styles = {
  container: (width: number, height: number) => ({
    position: 'relative',
    width: width,
    height: height,
    gridColumn: '1 / -1',
    transform: 'skewY(-2deg)'
  }),
  border: (border: BorderParams) => ({
    display: 'block',
    position: 'absolute',
    width: border.width,
    height: border.height,
    top: 0,
    left: 0,
    backgroundColor: mainHexPallete.yellow[300],
    zIndex: 0
  })
};
