import { render, screen } from '@testing-library/react';

import Contacts, { generateMetadata } from './page';
import * as envUtils from '~/utils/isProductionMode';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  getLocale: jest.fn().mockResolvedValue('uk'),
  setRequestLocale: jest.fn()
}));

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

const mockGetFooterData = jest.fn();
jest.mock('~/di/container', () => ({
  createRequestContainer: () => ({
    resolve: () => ({
      getFooterData: mockGetFooterData
    })
  })
}));

jest.mock('./ContactsInfo/ContactsInfo', () => {
  const MockInfo = ({ contacts }: any) => (
    <div data-testid="contacts-info">
      {contacts.email} - {contacts.phone}
    </div>
  );
  MockInfo.displayName = 'ContactsInfo';
  return MockInfo;
});

jest.mock('~/components/under-development/UnderDevelopment', () => {
  const MockUnderDev = () => <div data-testid="under-dev">Under Development</div>;
  MockUnderDev.displayName = 'UnderDevelopment';
  return MockUnderDev;
});

jest.mock('~/layouts/colored-layout/ColoredLayout', () => {
  const MockLayout = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="colored-layout">{children}</div>
  );
  MockLayout.displayName = 'ColoredLayout';
  return MockLayout;
});

describe('Contacts Page', () => {
  const mockParams = Promise.resolve({ lang: 'uk' as const });
  const mockFooterData = {
    contacts: { email: 'test@mail.com', phone: '+380123', foundationName: 'Test' },
    socialLinks: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);
    mockGetFooterData.mockResolvedValue(mockFooterData);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockParams });
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe('title');
  });

  it('should render UnderDevelopment in production mode', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);

    const ui = await Contacts({ params: mockParams });
    render(ui);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
  });

  it('should render contacts information from service in dev mode', async () => {
    const ui = await Contacts({ params: mockParams });
    render(ui);

    expect(screen.getByTestId('colored-layout')).toBeInTheDocument();
    expect(screen.getByText(/test@mail.com - \+380123/i)).toBeInTheDocument();
    expect(mockGetFooterData).toHaveBeenCalled();
  });
});
