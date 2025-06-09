import { ElementSizes } from '~/types/types/common.types';
import { BorderProps } from './ImageWithCaption';

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    position: 'relative',
    gridColumn: { xs: '2 / -1', sm: '4 / -1', md: '6 / -1' },
    alignSelf: 'start'
  },
  border: (border: BorderProps) => ({
    display: 'block',
    position: 'absolute',
    width: { ...border.sizes.width },
    height: { ...border.sizes.height },
    top: 0,
    left: 0,
    transform: {
      xs: `translate(-${border.left.xs}px, -${border.top.xs}px)`,
      sm: `translate(-${border.left.sm}px, -${border.top.sm}px)`,
      md: `translate(-${border.left.md}px, -${border.top.md}px)`,
      lg: `translate(-${border.left.lg}px, -${border.top.lg}px)`,
      xl: `translate(-${border.left.xl}px, -${border.top.xl}px)`,
      xxl: `translate(-${border.left.xxl}px, -${border.top.xxl}px)`,
      ultra: `translate(-${border.left.ultra}px, -${border.top.ultra}px)`
    },
    backgroundColor: '#FFE099',
    zIndex: 0
  }),
  imageContainer: (sizes: ElementSizes) => ({
    position: 'relative',
    width: { ...sizes.width },
    height: { ...sizes.height },
    gridColumn: '1 / -1'
  }),
  image: {
    objectFit: 'cover'
  },
  caption: (sizes: ElementSizes) => ({
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontSize: { xs: '12px', sm: '14px', md: '16px' },
    lineHeight: { xs: '130%', sm: '140%' },
    fontStyle: 'italic',
    letterSpacing: '0%',
    textAlign: 'right',
    color: '#63666E',
    mt: { xs: '8px', md: '16px' },
    maxWidth: { ...sizes.width },
    gridColumn: '1 / -1'
  })
};
