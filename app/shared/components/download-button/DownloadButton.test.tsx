import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DownloadButton from './DownloadButton';
import { downloadWithAnchor } from '~/utils/downloadFile';

jest.mock('~/utils/downloadFile', () => ({
  downloadWithAnchor: jest.fn()
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn().mockReturnValue((key: string) => {
    const translations = {
      downloadMusic: 'Download'
    };
    return translations[key as keyof typeof translations] ?? key;
  })
}));

jest.mock('~/ds-components/button/Button');

describe('DownloadButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call downloadWithAnchor with the correct parameters when clicked', () => {
    const testUrl = 'https://example.com/sheet-music.pdf';
    const testFileName = 'summer-vacation.jpeg';

    render(<DownloadButton url={testUrl} fileName={testFileName} />);

    const button = screen.getByRole('button', { name: /Download/i });
    fireEvent.click(button);

    expect(downloadWithAnchor).toHaveBeenCalledWith(testUrl, testFileName);
  });

  it('should render correctly', () => {
    render(<DownloadButton url="https://example.com/sheet-music.pdf" fileName="test" />);
    expect(screen.getByRole('button', { name: /Download/i })).toBeInTheDocument();
  });

  it('does not start another download while downloading', async () => {
    let resolveDownload: () => void;

    (downloadWithAnchor as jest.Mock).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveDownload = resolve;
        })
    );

    render(<DownloadButton url="https://example.com/sheet-music.pdf" fileName="test.pdf" />);

    const button = screen.getByRole('button', { name: /Download/i });
    fireEvent.click(button);
    fireEvent.click(button);

    expect(downloadWithAnchor).toHaveBeenCalledTimes(1);

    resolveDownload!();
  });
});
