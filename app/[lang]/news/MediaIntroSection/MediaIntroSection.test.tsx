import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import MediaIntroSection from './MediaIntroSection';

// mock next-intl
jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn()
}));

// mock ContentBlock
jest.mock('~/shared/components/design-system/all-components/content-block/ContentBlock', () => ({
  __esModule: true,
  default: ({ description }: { description: string }) => <div data-testid="ContentBlock">{description}</div>
}));

// mock media.const
jest.mock('~/shared/components/blocks/media-center/media.const', () => ({
  mediaBigDoc: {
    en: 'Big media text EN',
    uk: 'Big media text UK'
  },
  mediaSmallDoc: {
    en: 'Small media text EN',
    uk: 'Small media text UK'
  }
}));

import { useLocale, useTranslations } from 'next-intl';

describe('MediaIntroSection', () => {
  beforeEach(() => {
    (useLocale as jest.Mock).mockReturnValue('en');
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
    render(<MediaIntroSection />);

    expect(screen.getByRole('heading', { name: 'Media Center' })).toBeInTheDocument();
  });

  it('should render big and small media content blocks for current locale', () => {
    render(<MediaIntroSection />);

    const blocks = screen.getAllByTestId('ContentBlock');

    expect(blocks).toHaveLength(2);

    expect(blocks[0]).toHaveTextContent('Big media text EN');
    expect(blocks[1]).toHaveTextContent('Small media text EN');
  });
});
