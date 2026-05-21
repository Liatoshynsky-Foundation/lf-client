'use client';

import { Box, Typography, TypographyProps } from '@mui/material';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import { styles } from './PersonCard.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { renderData } from '~/shared/components/tip-tap-content/nodes';
import TipTapContent from '~/shared/components/tip-tap-content/TipTapContent';

interface PersonCardProps {
  imgURL: string;
  name: string | TipTapDoc;
  description: string | TipTapDoc;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = '/images/light-logo.svg';

interface TextRendererConfig {
  sx: TypographyProps['sx'];
}

const createTypographyRenderer = (config: TextRendererConfig) => {
  const Paragraph = (children: React.ReactNode) => <Typography sx={config.sx}>{children}</Typography>;
  return Paragraph;
};

const PersonCard: React.FC<PersonCardProps> = ({ imgURL, name, description, fallbackSrc = DEFAULT_FALLBACK }) => {
  const [src, setSrc] = useState<string>(imgURL);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      setSrc(fallbackSrc);
    }
  };

  const nameRenderer = useMemo(() => {
    return createTypographyRenderer({ sx: styles.name });
  }, []);

  const descriptionRenderer = useMemo(() => {
    return createTypographyRenderer({ sx: styles.description });
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.photoWrapper}>
        <Image
          alt="Person photo"
          src={src}
          width={185}
          height={166}
          style={{ ...styles.image, objectFit: failed ? 'contain' : 'cover' }}
          onError={handleError}
          loading="lazy"
        />
      </Box>

      {name && (
        <TipTapContent
          data={renderData(name)}
          nodeRenderers={{
            [TipTapNodeTypes.paragraph]: nameRenderer
          }}
        />
      )}

      {description && (
        <TipTapContent
          data={renderData(description)}
          nodeRenderers={{
            [TipTapNodeTypes.paragraph]: descriptionRenderer
          }}
        />
      )}
    </Box>
  );
};

export default PersonCard;
