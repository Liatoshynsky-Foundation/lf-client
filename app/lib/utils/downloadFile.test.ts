import { downloadWithAnchor } from '~/utils/downloadFile';

jest.mock('~/services/client/baseService');

describe('downloadWithAnchor', () => {
  const fileUrl = 'https://example.com/file.pdf';
  const fileName = 'file.pdf';

  it('creates and clicks an anchor link with download attribute', () => {
    const mockLink = {
      href: '',
      setAttribute: jest.fn(),
      click: jest.fn()
    };

    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation((child: Node) => child);
    const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation((child: Node) => child);
    const createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockLink as unknown as HTMLAnchorElement);

    downloadWithAnchor(fileUrl, fileName);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe(fileUrl);
    expect(mockLink.setAttribute).toHaveBeenCalledWith('download', fileName);
    expect(mockLink.click).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
    expect(removeChildSpy).toHaveBeenCalledWith(mockLink);

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});
