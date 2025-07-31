'use client';

import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { baseService } from '~/services/client/baseService';

const DownloadButton = ({ fileUrl, fileName }: { fileUrl: any; fileName: any }) => {
  const downloadWithFilePicker = async () => {
    const blob = await baseService.request<Blob>({
      url: fileUrl,
      method: 'GET',
      responseType: 'blob'
    });

    const fileHandle = await window.showSaveFilePicker({
      suggestedName: fileName
    });

    const writableStream = await fileHandle.createWritable();
    await writableStream.write(blob);
    await writableStream.close();
  };

  const downloadWithAnchor = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    if (window.showSaveFilePicker !== undefined) {
      downloadWithFilePicker();
    } else {
      downloadWithAnchor();
    }
  };

  return (
    <Button
      onClick={handleDownload}
      size={'medium'}
      variant={'outlined'}
      endIcon={<SvgImage src="/icons/download.svg" width={24} height={24} alt="download composition note" />}
    >
      Завантажити
    </Button>
  );
};

export default DownloadButton;
