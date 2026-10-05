import { act, renderHook } from '@testing-library/react';

import { useDownload } from './useDownload';

import { downloadWithAnchor } from '~/lib/utils/downloadFile';

jest.mock('~/lib/utils/downloadFile', () => ({
  downloadWithAnchor: jest.fn()
}));

const testUrl = 'https://example.com/file.pdf';
const testFileName = 'file.pdf';

describe('useDownload', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call downloadWithAnchor with the correct parameters', async () => {
    (downloadWithAnchor as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useDownload());
    await act(async () => await result.current.download(testUrl, testFileName));

    expect(downloadWithAnchor).toHaveBeenCalledWith(testUrl, testFileName);
  });

  it('should not start another download while downloading', async () => {
    let resolvedDownload: () => void;

    (downloadWithAnchor as jest.Mock).mockImplementation(
      () => new Promise<void>((resolve) => (resolvedDownload = resolve))
    );

    const { result } = renderHook(() => useDownload());
    act(() => void result.current.download(testUrl, testFileName));
    act(() => void result.current.download(testUrl, testFileName));

    expect(downloadWithAnchor).toHaveBeenCalledTimes(1);

    await act(async () => resolvedDownload!());
  });

  it('should allow another download after the previous one is completed', async () => {
    (downloadWithAnchor as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useDownload());
    await act(async () => await result.current.download(testUrl, testFileName));
    await act(async () => await result.current.download(testUrl, testFileName));

    expect(downloadWithAnchor).toHaveBeenCalledTimes(2);
  });
});
