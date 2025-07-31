'use client';

import { Box } from '@mui/material';
import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { handleDownload } from '~/utils/downloadFile';

interface DownloadButtonProps {
  folderName: string;
  fileName: string;
}

const DownloadButton = ({ folderName, fileName }: DownloadButtonProps) => {
  const fileFromBlobStorageUrl = `/api/blob-url?folderName=${folderName}&blobName=${fileName}`;
  const desiredFileName = 'Tetyana-Homon.jpg';

  return (
    <Box>
      <Button
        onClick={() => handleDownload(fileFromBlobStorageUrl, desiredFileName)}
        size={'medium'}
        variant={'outlined'}
        endIcon={<SvgImage src="/icons/download.svg" width={24} height={24} alt="download composition note" />}
      >
        Завантажити
      </Button>
    </Box>
  );
};

export default DownloadButton;
