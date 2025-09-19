import { Locale } from 'next-intl';
import { ReactNode } from 'react';

export interface LayoutProps {
  readonly children: ReactNode;
}

export interface RootLayoutParams {
  readonly children: ReactNode;
  readonly params: Promise<{ readonly lang: Locale }>;
}
