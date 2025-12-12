import { render, screen } from '@testing-library/react';
import React from 'react';

import { HeroSection } from './HeroSection';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import type { TipTapDoc } from '~/types/types/tiptap.types';

const mockResizeObserverObserve = jest.fn();
const mockResizeObserverUnobserve = jest.fn();
const mockResizeObserverDisconnect = jest.fn();

(globalThis as any).ResizeObserver = class {
  observe(...args: unknown[]) {
    mockResizeObserverObserve(...args);
  }

  unobserve(...args: unknown[]) {
    mockResizeObserverUnobserve(...args);
  }

  disconnect(...args: unknown[]) {
    mockResizeObserverDisconnect(...args);
  }
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

const makeTipTapDoc = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [
        {
          type: TipTapNodeTypes.text,
          text
        }
      ]
    }
  ]
});

const biographyHeroData = {
  title: 'ЖиТтєПиС ЛятОшИнсьКогО',
  quote: {
    text: '..мене завжди цікавило і цікавить минуле людства. Цілі епохи, колись сповнені руху і життя, сповнені подій і думок людства',
    source: 'З листа Бориса Лятошинського до Валерія Польового від 23 січня 1965 року'
  },
  image: {
    src: '/images/liatoshynsky-hero-section.png',
    alt: 'Борис Лятошинський з котами на дачі в Ворзелі',
    caption: {
      mainText: 'Борис Лятошинський з котами на дачі в Ворзелі.',
      yearText: '1960-ті роки'
    }
  },
  biographyText: makeTipTapDoc('Борис Лятошинський є одним із провідних українських композиторів ХХ століття.'),
  noteText:
    '*Життєпис створено на основі документів, що зберігаються у приватному архіві Кабінету-музею Бориса Лятошинського;'
} as any;

describe('HeroSection', () => {
  const renderHero = () => render(<HeroSection data={biographyHeroData} years={['1960']} />);

  it('should render main layout containers', () => {
    renderHero();

    expect(screen.getByTestId('HeroSection')).toBeInTheDocument();
    expect(screen.getByTestId('HeroSection-topContainer')).toBeInTheDocument();
    expect(screen.getByTestId('HeroSection-bottomContainer')).toBeInTheDocument();
  });

  it('should render title text', () => {
    renderHero();

    expect(screen.getByTestId('HeroSection-title')).toBeInTheDocument();
    expect(screen.getByText('ЖиТтєПиС ЛятОшИнсьКогО')).toBeInTheDocument();
  });

  it('should render quote block with correct text', () => {
    renderHero();

    expect(screen.getByTestId('HeroSection-quoteBlock')).toBeInTheDocument();
    expect(screen.getByTestId('HeroSection-quoteText')).toHaveTextContent(/мене завжди цікавило/i);
    expect(screen.getByTestId('HeroSection-quoteSource')).toHaveTextContent(/Лятошинського/i);
  });

  it('should render image block', () => {
    renderHero();

    expect(screen.getByTestId('HeroSection-imageCaption')).toBeInTheDocument();
  });

  it('should render biography and note content blocks', () => {
    renderHero();

    expect(screen.getByTestId('HeroSection-biographyContainer-contentBlock')).toBeInTheDocument();
    expect(screen.getByTestId('HeroSection-noteContainer-contentBlock')).toBeInTheDocument();
  });
});
