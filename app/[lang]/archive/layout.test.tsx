import { render, screen } from '@testing-library/react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import ArchiveLayout, { generateMetadata } from './layout';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(),
  setRequestLocale: jest.fn()
}));

describe('ArchiveLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getTranslations as jest.Mock).mockResolvedValue((key: string) => key);
  });

  it('should generate correct metadata', async () => {
    const mockParams = Promise.resolve({ lang: 'uk' as any });

    const metadata = await generateMetadata({ params: mockParams });

    expect(setRequestLocale).toHaveBeenCalledWith('uk');
    expect(getTranslations).toHaveBeenCalledWith('meta.pages.archive');
    expect(metadata).toBeDefined();
    expect(metadata.title).toBeDefined();
  });

  it('should render children correctly', () => {
    const TestComponent = () => <div data-testid="child">Archive Content</div>;

    render(
      <ArchiveLayout>
        <TestComponent />
      </ArchiveLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Archive Content')).toBeInTheDocument();
  });
});
