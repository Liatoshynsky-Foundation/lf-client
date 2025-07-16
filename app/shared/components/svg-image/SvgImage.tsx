import Image from 'next/image';

type SvgImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick?: () => void;
};

export const SvgImage = ({ src, alt, width, height, onClick }: SvgImageProps) => (
  <Image src={src} alt={alt} width={width} height={height} onClick={onClick} />
);
