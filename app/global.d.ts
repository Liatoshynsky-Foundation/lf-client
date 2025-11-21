declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  type SvgComponentProps = SVGProps<SVGSVGElement> & {
    title?: string;
  };

  const SvgComponent: FC<SvgComponentProps>;
  export default SvgComponent;
}
