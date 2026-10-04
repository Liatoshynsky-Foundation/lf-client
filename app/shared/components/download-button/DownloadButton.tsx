'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { downloadWithAnchor } from '~/utils/downloadFile';

interface DownloadButtonProps {
  url: string;
  fileName: string;
}

const DownloadButton = ({ url, fileName }: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const t = useTranslations('table.buttons');

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);

    try {
      await downloadWithAnchor(url, fileName);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Box>
      <Button
        onClick={handleDownload}
        size={'medium'}
        variant={'outlined'}
        endIcon={<SvgImage src="/icons/download.svg" width={24} height={24} alt="download composition note" />}
        label={t('downloadMusic')}
      />
    </Box>
  );
};

export default DownloadButton;
