import Image from 'next/image';

type SvgImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const SvgImage = ({ src, alt, width, height }: SvgImageProps) => (
  <Image src={src} alt={alt} width={width} height={height} />
);
