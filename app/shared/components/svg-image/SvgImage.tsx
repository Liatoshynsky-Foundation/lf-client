import Image, { StaticImageData } from 'next/image';

type SvgImageProps = {
  src: StaticImageData;
  alt: string;
};

export const SvgImage = ({ src, alt }: SvgImageProps) => (
  <Image src={src} alt={alt} />
);
