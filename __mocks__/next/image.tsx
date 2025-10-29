import { ImageProps } from 'next/image';

const image = ({ alt, src, width, height, style, fill, sizes, 'aria-label': ariaLabel }: ImageProps) => {
  return (
    <img
      alt={alt}
      src={src?.toString() ?? '/'}
      width={width}
      height={height}
      style={style}
      sizes={sizes}
      aria-label={ariaLabel}
      data-fill={fill}
    />
  );
};

export default image;
