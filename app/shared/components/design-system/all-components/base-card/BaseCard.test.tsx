import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import BaseCard, { BaseCardProps } from './BaseCard';
import { mockNewsCards, mockPressCards } from './newsAndMedia.mock';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      publishedAtLabel: 'Опубліковано:',
      viewButton: 'Переглянути',
      goToButton: 'Перейти'
    };
    return translations[key] || key;
  }
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} data-testid="next-image" />
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  )
}));

jest.mock('~/ds-components/button/Button', () => ({
  __esModule: true,
  default: ({
    children,
    endIcon,
    'data-testid': dataTestId
  }: {
    children: React.ReactNode;
    endIcon?: React.ReactNode;
    'data-testid'?: string;
  }) => (
    <button data-testid={dataTestId}>
      {children}
      {endIcon && <span data-testid="button-icon">{endIcon}</span>}
    </button>
  )
}));

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} data-testid="svg-image" />
}));

globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

describe('BaseCard', () => {
  const defaultProps: BaseCardProps = {
    image: '/test-image.jpg',
    title: 'Test Card Title',
    publicationDate: '01.01.25',
    description: 'Test card description text',
    href: '/test-link',
    variant: 'news'
  };

  describe('Component rendering & Mock Data Coverage', () => {
    it('should render correctly with REAL mock data (covers newsAndMedia.mock.ts)', () => {
      const newsData = { ...mockNewsCards[0], variant: 'news' as const };
      render(<BaseCard {...newsData} />);

      expect(screen.getByText(newsData.title)).toBeInTheDocument();
      expect(screen.getByText(newsData.description)).toBeInTheDocument();
    });

    it('should render the component with all base elements', () => {
      render(<BaseCard {...defaultProps} />);

      expect(screen.getByTestId('BaseCard')).toBeInTheDocument();
      expect(screen.getByTestId('BaseCard-imageContainer')).toBeInTheDocument();
      expect(screen.getByTestId('BaseCard-title')).toBeInTheDocument();
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    });

    it('should render image with correct props', () => {
      render(<BaseCard {...defaultProps} />);
      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('src', defaultProps.image);
      expect(image).toHaveAttribute('alt', defaultProps.title);
    });

    it('should render publication date with label', () => {
      render(<BaseCard {...defaultProps} />);
      expect(screen.getByText(`Опубліковано: ${defaultProps.publicationDate}`)).toBeInTheDocument();
    });
  });

  describe('Link Logic & Branch Coverage (Lines 83-88)', () => {
    it('should render a standard <a> tag for external links (isExternalLink branch)', () => {
      const externalProps = {
        ...defaultProps,
        href: 'https://external-resource.com',
        title: 'External Site'
      };

      render(<BaseCard {...externalProps} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://external-resource.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');

      expect(link).not.toHaveAttribute('data-testid', 'next-link');
    });

    it('should render a standard <a> tag when href is "#" (from mockPressCards)', () => {
      const pressData = { ...mockPressCards[0], variant: 'press' as const };
      render(<BaseCard {...pressData} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', pressData.href);
    });

    it('should render Next.js Link for internal routes', () => {
      render(<BaseCard {...defaultProps} href="/internal-page" />);
      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', '/internal-page');
    });

    it('should treat http:// links as external (short-circuit branch)', () => {
      render(<BaseCard {...defaultProps} href="http://localhost/page" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'http://localhost/page');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Variants: news vs press', () => {
    it('should render "news" variant without icon', () => {
      render(<BaseCard {...defaultProps} variant="news" />);
      expect(screen.getByText('Переглянути')).toBeInTheDocument();
      expect(screen.queryByTestId('button-icon')).not.toBeInTheDocument();
    });

    it('should render "press" variant with external link icon', () => {
      render(<BaseCard {...defaultProps} variant="press" />);
      expect(screen.getByText('Перейти')).toBeInTheDocument();
      expect(screen.getByTestId('button-icon')).toBeInTheDocument();
      expect(screen.getByTestId('svg-image')).toHaveAttribute('src', '/icons/external-link.svg');
    });
  });

  describe('Custom dataTestId & Accessibility', () => {
    it('should use custom dataTestId when provided', () => {
      render(<BaseCard {...defaultProps} dataTestId="CustomID" />);
      expect(screen.getByTestId('CustomID')).toBeInTheDocument();
      expect(screen.getByTestId('CustomID-title')).toBeInTheDocument();
    });

    it('should render as semantic article with aria-label', () => {
      render(<BaseCard {...defaultProps} />);
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
      expect(article).toHaveAttribute('aria-label', defaultProps.title);
    });
  });

  describe('Props variations', () => {
    it('should handle missing description or long content', () => {
      const longTitle = 'A'.repeat(100);
      render(<BaseCard {...defaultProps} title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });
  });

  describe('Crop functionality', () => {
    afterEach(() => {
      globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn()
      }));
      Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { configurable: true, get: () => 0 });
      Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { configurable: true, get: () => 0 });
    });

    it('should render native img when crop is provided', () => {
      const crop = { x: 0, y: 0, width: 200, height: 150 };
      render(<BaseCard {...defaultProps} crop={crop} />);

      const img = screen.getByRole('img', { name: defaultProps.title });
      expect(img.tagName).toBe('IMG');
      expect(img).toHaveAttribute('src', defaultProps.image);
      expect(img).toHaveAttribute('alt', defaultProps.title);
      expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
    });

    it('should render Next.js Image when crop is null', () => {
      render(<BaseCard {...defaultProps} crop={null} />);

      expect(screen.getByTestId('next-image')).toBeInTheDocument();
    });

    it('should disconnect ResizeObserver on unmount', () => {
      const disconnectMock = jest.fn();
      globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: disconnectMock
      }));

      const crop = { x: 0, y: 0, width: 100, height: 100 };
      const { unmount } = render(<BaseCard {...defaultProps} crop={crop} />);
      unmount();

      expect(disconnectMock).toHaveBeenCalled();
    });

    it('should call handleImageLoad and buildCroppedStyle when image loads with sized container', () => {
      globalThis.ResizeObserver = jest.fn().mockImplementation((cb: ResizeObserverCallback) => ({
        observe: jest.fn(() => {
          cb([{ contentRect: { width: 400, height: 300 } } as ResizeObserverEntry], {} as ResizeObserver);
        }),
        unobserve: jest.fn(),
        disconnect: jest.fn()
      }));

      Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { configurable: true, get: () => 800 });
      Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { configurable: true, get: () => 600 });

      const crop = { x: 10, y: 20, width: 200, height: 150 };
      render(<BaseCard {...defaultProps} crop={crop} />);

      const img = screen.getByRole('img', { name: defaultProps.title });

      act(() => {
        fireEvent.load(img);
      });

      expect(img.style.transform).toContain('translate');
    });
  });
});
