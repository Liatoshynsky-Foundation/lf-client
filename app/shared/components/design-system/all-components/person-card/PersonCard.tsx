'use client';

import { Box, SxProps, Theme, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';

import { styles } from './PersonCard.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { type CropRect } from '~/lib/utils/cropUtils';
import CroppedImage from '~/shared/components/cropped-image/CroppedImage';
import { renderData } from '~/shared/components/tip-tap-content/nodes';
import TipTapContent from '~/shared/components/tip-tap-content/TipTapContent';

interface PersonCardProps {
  imgURL: string;
  name: string | TipTapDoc;
  description: string | TipTapDoc;
  fallbackSrc?: string;
  crop?: CropRect | null;
}

const DEFAULT_FALLBACK = '/images/light-logo.svg';

const renderBlock = (sx: SxProps<Theme>) => {
  const Block = (children: React.ReactNode) => <Typography sx={sx}>{children}</Typography>;
  return Block;
};

const PersonCard: React.FC<PersonCardProps> = ({ imgURL, name, description, fallbackSrc = DEFAULT_FALLBACK, crop }) => {
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

  const isDefaultPlaceholder = src === DEFAULT_FALLBACK || src.endsWith(DEFAULT_FALLBACK);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.photoWrapper}>
        <Box sx={styles.photoBackground} />
        {isDefaultPlaceholder ? (
          <Box
            component="img"
            src={DEFAULT_FALLBACK}
            alt=""
            data-testid="person-card-placeholder-logo"
            sx={styles.placeholderLogo}
          />
        ) : (
          <Box sx={styles.photoImageWrapper}>
            <CroppedImage
              src={src}
              alt="Person"
              crop={crop}
              width={185}
              height={166}
              imageStyle={{ ...styles.image, objectFit: failed ? 'contain' : 'cover' }}
              onError={handleError}
              loading="lazy"
            />
          </Box>
        )}
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
