'use client';

import React from 'react';

import BulletTextWithLinks from '~/ds-components/bullet-text-with-links/BulletTextWithLinks';

import { TipTapDoc } from '~/types/types/tiptap.types';

export interface YermolenkoLinksProps {
  data?: {
    buttonText: string;
    description: TipTapDoc | string;
    buttons?: Array<{
      shortText: string;
      fullText: string;
      link?: string;
    }>;
  };
}

export default function YermolenkoLinks({ data }: Readonly<YermolenkoLinksProps>) {
  if (!data) return null;

  const safeButtons = (data.buttons || []).map((btn) => ({
    link: btn.link || '',
    shortText: { uk: btn.shortText, en: btn.shortText },
    fullText: { uk: btn.fullText, en: btn.fullText }
  }));

  return (
    <BulletTextWithLinks
      buttonText={data.buttonText}
      description={data.description}
      buttons={safeButtons}
      showMainButton={true}
      sx={{ marginBottom: 12 }}
      showShortButtonsText={false}
    />
  );
}
