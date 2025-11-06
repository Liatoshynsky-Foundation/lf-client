import { mainHexPallete } from '../theme/colors';

export const styles = {
  container: (width?: number, height?: number) => ({
    position: 'relative',
    width: width ?? '100%',
    height: height ?? '100%',
    gridColumn: '1 / -1'
  }),
  border: (borderWidth: number, height?: number) => ({
    display: 'block',
    position: 'absolute',
    width: borderWidth,
    height: height ?? '100%',
    top: 0,
    left: 0,
    backgroundColor: mainHexPallete.yellow[300],
    zIndex: 1
  })
};
