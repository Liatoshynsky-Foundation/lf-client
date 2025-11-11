import { render, screen } from '@testing-library/react';

import BulletTextWithLinks from './BulletTextWithLinks';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('next/image');

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  __esModule: true,
  Svg: () => <div data-testid="mock-svg" />
}));

jest.mock('~/public/icons/arrow-up-right.svg', () => <div />);
jest.mock('~/public/icons/facebook.svg', () => <div />);

describe('BulletTextWithlinks component', () => {
  const useBreakpointsMock = useBreakpoints as jest.Mock;

  const defaultButtons = [{ shortText: 'FB', fullText: 'Facebook', link: 'https://facebook.com' }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render desktop version with full button text', () => {
    useBreakpointsMock.mockReturnValue({ isMobile: false });

    render(<BulletTextWithLinks buttonText="Support Us" buttons={defaultButtons} />);

    expect(screen.getByText('Support Us')).toBeInTheDocument();

    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.queryByText('FB')).not.toBeInTheDocument();
  });

  it('should render mobile version with short button text', () => {
    useBreakpointsMock.mockReturnValue({ isMobile: true });

    render(<BulletTextWithLinks buttonText="Support Us" buttons={defaultButtons} />);

    expect(screen.getByText('Support Us')).toBeInTheDocument();

    expect(screen.getByText('FB')).toBeInTheDocument();
    expect(screen.queryByText('Facebook')).not.toBeInTheDocument();
  });
});
