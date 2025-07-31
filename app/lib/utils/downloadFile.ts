import { baseService } from '~/services/client/baseService';

const downloadWithFilePicker = async (fileUrl: string, fileName: string) => {
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

const downloadWithAnchor = (fileUrl: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleDownload = async (fileUrl: string, fileName: string): Promise<void> => {
  if (window.showSaveFilePicker !== undefined) {
    await downloadWithFilePicker(fileUrl, fileName);
  } else {
    downloadWithAnchor(fileUrl, fileName);
  }
};
