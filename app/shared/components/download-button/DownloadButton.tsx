'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { ApiRoutes } from '~/constants/routes/api-routes';
import { downloadWithAnchor } from '~/utils/downloadFile';
import { getStorageFileEndpoint } from '~/utils/storageFileEndpoint';

interface DownloadButtonProps {
  folderName: string;
  fileName: string;
}

const DownloadButton = ({ folderName, fileName }: DownloadButtonProps) => {
  const t = useTranslations('table.buttons');
  const storageFileUrl = getStorageFileEndpoint(ApiRoutes.STORAGE_FILE, folderName, fileName);

  return (
    <Box>
      <Button
        onClick={() => downloadWithAnchor(storageFileUrl, fileName)}
        size={'medium'}
        variant={'outlined'}
        endIcon={<SvgImage src="/icons/download.svg" width={24} height={24} alt="download composition note" />}
      >
        {t('downloadMusic')}
      </Button>
    </Box>
  );
};

export default DownloadButton;
