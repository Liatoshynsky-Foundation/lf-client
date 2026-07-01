import { fireEvent, render, screen } from '@testing-library/react';

import TranslationNotFound from './TranslationNotFound';

jest.mock('~/ds-components/button/Button');

jest.mock('next/image');

const mockTranslations = {
  title: 'CoMing SoOn',
  description:
    'Our archive cat Filimon has taken on a new role — translator. He’s working on this page, so the English version will appear very soon.',
  button: 'Return to Ukrainian'
};

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => mockTranslations[key as keyof typeof mockTranslations] || key
}));

const mockPush = jest.fn();
const mockPathname = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname()
}));

describe('TranslationNotFound (Next.js)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render image, heading, paragraph, and button', () => {
    mockPathname.mockReturnValueOnce('/en-US/foo/bar');

    render(<TranslationNotFound />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.getByText(/english version will appear very soon./i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should redirect to same path with /uk prefix when button is clicked', () => {
    mockPathname.mockReturnValueOnce('/en-US/foo/bar');

    render(<TranslationNotFound />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/uk/foo/bar');
  });

  it('should handle paths without locale prefix correctly', () => {
    mockPathname.mockReturnValueOnce('/foo/bar');

    render(<TranslationNotFound />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockPush).toHaveBeenCalledWith('/uk/foo/bar');
  });
});
