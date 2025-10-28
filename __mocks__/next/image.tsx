import { ImageProps } from 'next/image';

const image = ({ alt, src, width, height, style, fill, sizes }: ImageProps) => {
  return (
    <img
      alt={alt}
      src={src?.toString() ?? '/'}
      width={width}
      height={height}
      style={style}
      sizes={sizes}
      data-fill={fill}
    />
  );
};

export default image;
