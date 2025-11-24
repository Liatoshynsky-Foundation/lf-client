import { render, screen } from '@testing-library/react';
import React from 'react';

import { HeroSection } from './HeroSection';
import { heroTexts } from './HeroSection.content';

jest.mock('next-intl', () => ({
  useLocale: () => 'uk',
  useTranslations: () => (key: string) => (key === 'title' ? 'ЖиТтєПиС ЛятОшИнсьКогО' : key)
}));

jest.mock('~/components/image-with-caption/ImageWithCaption', () => {
  return function MockImageWithCaption(props: { alt?: string }) {
    return <div data-testid="HeroSection-imageCaption">mocked-image: {props.alt ?? 'mock-image'}</div>;
  };
});

jest.mock('../../Quote/Quote', () => {
  return function MockQuote(props: { quoteText: string; sourceText: string }) {
    return (
      <div data-testid="HeroSection-quoteBlock">
        <span data-testid="HeroSection-quoteText">{props.quoteText}</span>
        <span data-testid="HeroSection-quoteSource">{props.sourceText}</span>
      </div>
    );
  };
});

jest.mock('~/components/design-system/all-components/content-block/ContentBlock', () => {
  return function MockContentBlock(props: { dataTestId?: string }) {
    return <div data-testid={props.dataTestId ?? 'HeroSection-contentBlock-mock'} />;
  };
});

describe('HeroSection', () => {
  it('should render main layout containers', () => {
    render(<HeroSection />);

    expect(screen.getByTestId('HeroSection')).toBeInTheDocument();
    expect(screen.getByTestId('HeroSection-topContainer')).toBeInTheDocument();
    expect(screen.getByTestId('HeroSection-bottomContainer')).toBeInTheDocument();
  });

  it('should render localized title text', () => {
    render(<HeroSection />);

    const titleWrapper = screen.getByTestId('HeroSection-title');
    expect(titleWrapper).toBeInTheDocument();
    expect(screen.getByText('ЖиТтєПиС ЛятОшИнсьКогО')).toBeInTheDocument();
  });

  it('should render quote block with correct localized text', () => {
    render(<HeroSection />);

    const quoteBlock = screen.getByTestId('HeroSection-quoteBlock');
    expect(quoteBlock).toBeInTheDocument();

    expect(screen.getByTestId('HeroSection-quoteText')).toHaveTextContent(
      /мене завжди цікавило і цікавить минуле людства/i
    );

    expect(screen.getByTestId('HeroSection-quoteSource')).toHaveTextContent(/Бориса Лятошинського/i);
  });

  it('should render image block with localized alt text', () => {
    render(<HeroSection />);

    const image = screen.getByTestId('HeroSection-imageCaption');
    expect(image).toBeInTheDocument();
    expect(image).toHaveTextContent(heroTexts.image.alt['uk']);
  });

  it('should render biography and note content blocks', () => {
    render(<HeroSection />);

    const bioBlock = screen.getByTestId('HeroSection-biographyContainer-contentBlock');
    const noteBlock = screen.getByTestId('HeroSection-noteContainer-contentBlock');

    expect(bioBlock).toBeInTheDocument();
    expect(noteBlock).toBeInTheDocument();
  });
});
