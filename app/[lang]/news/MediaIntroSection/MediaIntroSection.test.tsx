import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import MediaIntroSection from './MediaIntroSection';

// mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn()
}));

// mock ContentBlock
jest.mock('~/shared/components/design-system/all-components/content-block/ContentBlock', () => ({
  __esModule: true,
  default: ({ description }: { description: string }) => <div data-testid="ContentBlock">{description}</div>
}));

import { useTranslations } from 'next-intl';

describe('MediaIntroSection', () => {
  const mockData = {
    publicationsIntro: 'First paragraph from CMS',
    publicationsOutro: 'Second paragraph from CMS'
  };

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        title: 'Media Center'
      };
      return translations[key];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render translated title', () => {
    render(<MediaIntroSection data={mockData} />);

    expect(screen.getByRole('heading', { name: 'Media Center' })).toBeInTheDocument();
  });

  it('should render big and small media content blocks for current locale', () => {
    render(<MediaIntroSection data={mockData} />);

    const blocks = screen.getAllByTestId('ContentBlock');

    expect(blocks).toHaveLength(2);

    expect(blocks[0]).toHaveTextContent('First paragraph from CMS');
    expect(blocks[1]).toHaveTextContent('Second paragraph from CMS');
  });
});
