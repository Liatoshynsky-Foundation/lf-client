import { fireEvent, render, screen } from '@testing-library/react';

import TranslationNotFound from './TranslationNotFound';

jest.mock('~/ds-components/button/Button');

jest.mock('next/image');

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
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();

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

  it('should not redirect when pathname is null', () => {
    mockPathname.mockReturnValueOnce(null);

    render(<TranslationNotFound />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockPush).not.toHaveBeenCalled();
  });
});
