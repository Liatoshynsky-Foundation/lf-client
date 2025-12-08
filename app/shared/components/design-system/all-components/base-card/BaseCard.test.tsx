import { render, screen } from '@testing-library/react';
import React from 'react';

import BaseCard, { BaseCardProps } from './BaseCard';

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
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
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

describe('BaseCard', () => {
  const defaultProps: BaseCardProps = {
    image: '/test-image.jpg',
    title: 'Test Card Title',
    publicationDate: '01.01.25',
    description: 'Test card description text',
    href: '/test-link',
    variant: 'news'
  };

  describe('Component rendering', () => {
    it('should render the component with all elements', () => {
      render(<BaseCard {...defaultProps} />);

      expect(screen.getByTestId('BaseCard')).toBeInTheDocument();
      expect(screen.getByTestId('BaseCard-imageContainer')).toBeInTheDocument();
      expect(screen.getByTestId('BaseCard-content')).toBeInTheDocument();
      expect(screen.getByTestId('BaseCard-title')).toBeInTheDocument();
      expect(screen.getByTestId('BaseCard-date')).toBeInTheDocument();
      expect(screen.getByTestId('BaseCard-description')).toBeInTheDocument();
      expect(screen.getByTestId('BaseCard-buttonWrapper')).toBeInTheDocument();
      expect(screen.getByTestId('BaseCard-button')).toBeInTheDocument();
    });

    it('should render image with correct props', () => {
      render(<BaseCard {...defaultProps} />);

      const image = screen.getByTestId('next-image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', defaultProps.image);
      expect(image).toHaveAttribute('alt', defaultProps.title);
    });

    it('should render title text', () => {
      render(<BaseCard {...defaultProps} />);

      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    });

    it('should render publication date with label', () => {
      render(<BaseCard {...defaultProps} />);

      expect(screen.getByText(`Опубліковано: ${defaultProps.publicationDate}`)).toBeInTheDocument();
    });

    it('should render description text', () => {
      render(<BaseCard {...defaultProps} />);

      expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    });

    it('should render as a clickable link', () => {
      render(<BaseCard {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', defaultProps.href);
    });
  });

  describe('Variant: news', () => {
    it('should render correct button text for news variant', () => {
      render(<BaseCard {...defaultProps} variant="news" />);

      expect(screen.getByText('Переглянути')).toBeInTheDocument();
    });

    it('should not render icon for news variant', () => {
      render(<BaseCard {...defaultProps} variant="news" />);

      expect(screen.queryByTestId('button-icon')).not.toBeInTheDocument();
    });
  });

  describe('Variant: press', () => {
    it('should render correct button text for press variant', () => {
      render(<BaseCard {...defaultProps} variant="press" />);

      expect(screen.getByText('Перейти')).toBeInTheDocument();
    });

    it('should render icon for press variant', () => {
      render(<BaseCard {...defaultProps} variant="press" />);

      expect(screen.getByTestId('button-icon')).toBeInTheDocument();
      expect(screen.getByTestId('svg-image')).toBeInTheDocument();
    });

    it('should render correct icon for press variant', () => {
      render(<BaseCard {...defaultProps} variant="press" />);

      const icon = screen.getByTestId('svg-image');
      expect(icon).toHaveAttribute('src', '/icons/external-link.svg');
    });
  });

  describe('Custom dataTestId', () => {
    it('should use custom dataTestId when provided', () => {
      render(<BaseCard {...defaultProps} dataTestId="CustomTestId" />);

      expect(screen.getByTestId('CustomTestId')).toBeInTheDocument();
      expect(screen.getByTestId('CustomTestId-imageContainer')).toBeInTheDocument();
      expect(screen.getByTestId('CustomTestId-content')).toBeInTheDocument();
      expect(screen.getByTestId('CustomTestId-title')).toBeInTheDocument();
      expect(screen.getByTestId('CustomTestId-date')).toBeInTheDocument();
      expect(screen.getByTestId('CustomTestId-description')).toBeInTheDocument();
      expect(screen.getByTestId('CustomTestId-buttonWrapper')).toBeInTheDocument();
      expect(screen.getByTestId('CustomTestId-button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render as semantic article element', () => {
      render(<BaseCard {...defaultProps} />);

      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('should have aria-label with card title', () => {
      render(<BaseCard {...defaultProps} />);

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-label', defaultProps.title);
    });
  });

  describe('Props variations', () => {
    it('should handle different image URLs', () => {
      const customProps = { ...defaultProps, image: '/custom-image.png' };
      render(<BaseCard {...customProps} />);

      const image = screen.getByTestId('next-image');
      expect(image).toHaveAttribute('src', '/custom-image.png');
    });

    it('should handle different href values', () => {
      const customProps = { ...defaultProps, href: '/custom-link' };
      render(<BaseCard {...customProps} />);

      expect(screen.getByRole('link')).toHaveAttribute('href', '/custom-link');
    });

    it('should handle long titles', () => {
      const longTitle = 'This is a very long title that should be truncated with ellipsis after two lines';
      render(<BaseCard {...defaultProps} title={longTitle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle long descriptions', () => {
      const longDescription =
        'This is a very long description that should be truncated with ellipsis after three lines of text content';
      render(<BaseCard {...defaultProps} description={longDescription} />);

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });
});
