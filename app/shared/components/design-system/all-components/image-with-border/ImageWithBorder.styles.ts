import { mainHexPallete } from '../theme/colors';

export const styles = {
  container: (width: number, height: number) => ({
    position: 'relative',
    width: width,
    height: height,
    gridColumn: '1 / -1',
    transform: 'skewY(-2deg)'
  }),
  border: (borderWidth: number, height: number) => ({
    display: 'block',
    position: 'absolute',
    width: borderWidth,
    height: height,
    top: 0,
    left: 0,
    backgroundColor: mainHexPallete.yellow[300],
    zIndex: 0
  })
};
