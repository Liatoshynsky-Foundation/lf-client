import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DownloadButton from './DownloadButton';
import { handleDownload } from '~/utils/downloadFile';

jest.mock('~/utils/downloadFile', () => ({
  handleDownload: jest.fn()
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn().mockReturnValue((key: string) => {
    const translations = {
      downloadMusic: 'Download'
    };
    return translations[key as keyof typeof translations] ?? key;
  })
}));

describe('DownloadButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call handleDownload with the correct parameters when clicked', () => {
    const testFolderName = 'my-photos';
    const testFileName = 'summer-vacation.jpeg';

    render(<DownloadButton folderName={testFolderName} fileName={testFileName} />);

    const button = screen.getByRole('button', { name: /Download/i });
    fireEvent.click(button);

    const expectedUrl = `/api/blob-url?folderName=${testFolderName}&blobName=${testFileName}`;

    expect(handleDownload).toHaveBeenCalledWith(expectedUrl, testFileName);
  });

  it('should render correctly', () => {
    render(<DownloadButton folderName="test" fileName="test" />);
    expect(screen.getByRole('button', { name: /Download/i })).toBeInTheDocument();
  });
});
