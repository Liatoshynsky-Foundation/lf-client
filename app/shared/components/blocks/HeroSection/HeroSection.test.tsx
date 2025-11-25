import { render, screen } from '@testing-library/react';
import React from 'react';

import { biographyHeroData } from '../../../../[lang]/biography/data/HeroSection.consts';
import { HeroSection } from './HeroSection';
(global as any).ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

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
  const renderHero = () => render(<HeroSection data={biographyHeroData} years={['1960']} />);

  it('should render main layout containers', () => {
    renderHero();

    expect(screen.getByTestId('HeroSection')).toBeInTheDocument();
    expect(screen.getByTestId('HeroSection-topContainer')).toBeInTheDocument();
    expect(screen.getByTestId('HeroSection-bottomContainer')).toBeInTheDocument();
  });

  it('should render localized title text', () => {
    renderHero();

    const titleWrapper = screen.getByTestId('HeroSection-title');
    expect(titleWrapper).toBeInTheDocument();
    expect(screen.getByText('ЖиТтєПиС ЛятОшИнсьКогО')).toBeInTheDocument();
  });

  it('should render quote block with correct localized text', () => {
    renderHero();

    const quoteBlock = screen.getByTestId('HeroSection-quoteBlock');
    expect(quoteBlock).toBeInTheDocument();

    expect(screen.getByTestId('HeroSection-quoteText')).toHaveTextContent(
      /мене завжди цікавило і цікавить минуле людства/i
    );

    expect(screen.getByTestId('HeroSection-quoteSource')).toHaveTextContent(/Бориса Лятошинського/i);
  });

  it('should render image block', () => {
    renderHero();

    const image = screen.getByTestId('HeroSection-imageCaption');
    expect(image).toBeInTheDocument();
  });

  it('should render biography and note content blocks', () => {
    renderHero();

    const bioBlock = screen.getByTestId('HeroSection-biographyContainer-contentBlock');
    const noteBlock = screen.getByTestId('HeroSection-noteContainer-contentBlock');

    expect(bioBlock).toBeInTheDocument();
    expect(noteBlock).toBeInTheDocument();
  });
});
