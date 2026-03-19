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

    const expectedText = 'Any financial contribution made to the Foundation';
    expect(tiptapBlocks[0]).toHaveTextContent(new RegExp(expectedText, 'i'));

    expect(tiptapBlocks[1]).toHaveTextContent(/We understand that everyone has different/i);
  });
});
