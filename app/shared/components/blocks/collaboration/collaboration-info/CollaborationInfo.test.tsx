import { render, screen } from '@testing-library/react';

import CollaborationInfo from './CollaborationInfo';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  __esModule: true,
  Svg: () => <div data-testid="mock-svg" />
}));

jest.mock('~/components/tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data }: any) => <div data-testid="tiptap-mock">{JSON.stringify(data)}</div>
}));

describe('CollaborationInfo component with real data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render and cover constants by checking ButtonContentBlock', () => {
    render(<CollaborationInfo />);

    expect(screen.getByTestId('ButtonContentBlock')).toBeInTheDocument();

    expect(screen.getByText('title')).toBeInTheDocument();
  });

  test('should verify that real constant data from collaboration.const.ts is used', () => {
    render(<CollaborationInfo />);

    const tiptapBlocks = screen.getAllByTestId('tiptap-mock');

    const expectedText = 'Charitable contributions may support the Foundation’s ongoing work';
    expect(tiptapBlocks[0]).toHaveTextContent(new RegExp(expectedText, 'i'));

    expect(tiptapBlocks[1]).toHaveTextContent(/Over the course of the Foundation’s work/i);
    expect(tiptapBlocks[2]).toHaveTextContent(/The involvement of partners and patrons/i);
    expect(tiptapBlocks[3]).toHaveTextContent(/For each joint project/i);
  });
});
