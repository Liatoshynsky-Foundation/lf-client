'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

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

const PersonCard: React.FC<PersonCardProps> = ({ imgURL, name, description, fallbackSrc = DEFAULT_FALLBACK }) => {
  const [src, setSrc] = useState<string>(imgURL);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      setSrc(fallbackSrc);
    }
  };

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
            [TipTapNodeTypes.paragraph]: (children) => <Typography sx={styles.name}>{children}</Typography>
          }}
        />
      )}

      {description && (
        <TipTapContent
          data={renderData(description)}
          nodeRenderers={{
            [TipTapNodeTypes.paragraph]: (children) => <Typography sx={styles.description}>{children}</Typography>
          }}
        />
      )}
    </Box>
  );
};

export default PersonCard;
