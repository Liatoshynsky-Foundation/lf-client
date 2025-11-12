import { MessageChannel } from 'worker_threads';
(global as any).MessageChannel = MessageChannel;

import { getLocale } from 'next-intl/server';
import React from 'react';

import HeaderServer from './Header.server';

import { createRequestContainer } from '~/di/container';

jest.mock('next-intl/server', () => ({
  getLocale: jest.fn()
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn()
}));

jest.mock('./Header.client', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="HeaderClient" />)
}));

describe('HeaderServer', () => {
  const mockHeaderService = { getHeaderData: jest.fn() };
  const mockFooterService = { getFooterData: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();

    (getLocale as jest.Mock).mockResolvedValue('en');
    mockHeaderService.getHeaderData.mockResolvedValue({ title: 'HeaderData' });
    mockFooterService.getFooterData.mockResolvedValue({
      contacts: { phone: '+380990000000' },
      socialLinks: [{ link: 'https://insta.com', icon: 'inst.svg' }]
    });

    (createRequestContainer as jest.Mock)
      .mockReturnValueOnce({ resolve: (key: string) => (key === 'headerService' ? mockHeaderService : null) })
      .mockReturnValueOnce({ resolve: (key: string) => (key === 'footerService' ? mockFooterService : null) });
  });

  it('should fetch required data and return valid React element', async () => {
    const result = await HeaderServer();

    expect(getLocale).toHaveBeenCalledTimes(1);
    expect(mockHeaderService.getHeaderData).toHaveBeenCalledWith('en');
    expect(mockFooterService.getFooterData).toHaveBeenCalledWith('en');

    expect(result).toBeDefined();
    expect(React.isValidElement(result)).toBe(true);

    expect(result.props.headerData).toEqual({ title: 'HeaderData' });
    expect(result.props.contacts).toEqual({ phone: '+380990000000' });
    expect(result.props.socialLinks).toEqual([{ link: 'https://insta.com', icon: 'inst.svg' }]);
  });

  it('should create new containers when loading data', async () => {
    await HeaderServer();
    expect(createRequestContainer).toHaveBeenCalledTimes(2);
  });
});
