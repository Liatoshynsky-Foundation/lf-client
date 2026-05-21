'use client';

import { Box, SxProps, Theme, Typography } from '@mui/material';
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

const renderBlock = (sx: SxProps<Theme>) => {
  const Block = (children: React.ReactNode) => <Typography sx={sx}>{children}</Typography>;
  return Block;
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
    return renderBlock(styles.name);
  }, []);

  const descriptionRenderer = useMemo(() => {
    return renderBlock(styles.description);
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
