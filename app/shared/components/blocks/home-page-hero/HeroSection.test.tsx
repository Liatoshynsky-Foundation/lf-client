import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import HeroSection, { Props } from './HeroSection';

import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface BoxProps {
  children?: React.ReactNode;
  'data-testid'?: string;
}

interface ImageProps {
  src?: string;
  alt?: string;
  'data-testid'?: string;
  style?: React.CSSProperties;
}

interface BoxButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  testID?: string;
}

interface QuoteBlockProps {
  heroQuote?: string;
  heroQuoteSource?: string;
}

interface SvgImageProps {
  src?: string;
  alt?: string;
  'data-testid'?: string;
}

jest.mock('./HeroSection.styles', () => ({
  heroSectionStyles: {
    heroSection: {},
    clickableArea: {},
    backgroundContainer: {},
    heroCharacter: {},
    textLogoStyle: {}
  }
}));

jest.mock('@mui/material', () => ({
  Box: ({ children, 'data-testid': testId }: BoxProps) => <div data-testid={testId}>{children}</div>
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, 'data-testid': testId, style }: ImageProps) => (
    <img src={src} alt={alt} data-testid={testId} style={style} />
  )
}));

jest.mock('./custom-cursor/BoxButton/BoxButton', () => ({
  BoxButton: ({ children, onClick, testID }: BoxButtonProps) => (
    <button data-testid={testID} onClick={onClick}>
      {children}
    </button>
  )
}));

jest.mock('./hero-section-quote-block/HeroSectionQuoteBlock', () => ({
  HeroSectionQuoteBlock: ({ heroQuote, heroQuoteSource }: QuoteBlockProps) => (
    <div data-testid="hero-quote-block">
      <span>{heroQuote}</span>
      <span>{heroQuoteSource}</span>
    </div>
  )
}));

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: ({ src, alt, 'data-testid': testId }: SvgImageProps) => <img src={src} alt={alt} data-testid={testId} />
}));

jest.mock('~/shared/context/AudioPlayerContext', () => ({
  useAudioPlayer: jest.fn()
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());

describe('HeroSection', () => {
  const defaultProps: Props = {
    heroQuote: 'Test Quote',
    heroQuoteSource: 'Test Source',
    playbackButton: {
      startPlayback: 'Play',
      stopPlayback: 'Pause'
    }
  };

  const mockTogglePlay = jest.fn();
  const mockOpenPlayer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAudioPlayer as jest.Mock).mockReturnValue({
      isPlaying: false,
      togglePlay: mockTogglePlay,
      openPlayer: mockOpenPlayer
    });
    (useBreakpoints as jest.Mock).mockReturnValue({
      isLaptopAndAbove: true,
      isMobile: false,
      isTablet: false
    });
  });

  it('should render correct layout for laptop and above breakpoints', () => {
    render(<HeroSection {...defaultProps} />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('hero-background-image')).toBeInTheDocument();
    expect(screen.getByTestId('hero-character-image')).toBeInTheDocument();
    expect(screen.getByTestId('hero-text-logo')).toBeInTheDocument();

    const quotes = screen.getAllByTestId('hero-quote-block');
    expect(quotes.length).toBe(1);
  });

  it('should render content with specific styles on mobile or tablet breakpoints', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({
      isLaptopAndAbove: false,
      isMobile: true,
      isTablet: false
    });

    render(<HeroSection {...defaultProps} />);

    const quotes = screen.getAllByTestId('hero-quote-block');
    expect(quotes.length).toBe(1);
    expect(screen.getByTestId('hero-character-image')).toHaveStyle({ objectFit: 'cover' });
  });

  it('should trigger audio controls on playback button interaction when not playing', () => {
    render(<HeroSection {...defaultProps} />);

    const button = screen.getByTestId('hero-playback-button');
    fireEvent.click(button);

    expect(mockTogglePlay).toHaveBeenCalledTimes(1);
    expect(mockOpenPlayer).toHaveBeenCalledTimes(1);
  });

  it('should adjust internal conditions when context audio state is playing', () => {
    (useAudioPlayer as jest.Mock).mockReturnValue({
      isPlaying: true,
      togglePlay: mockTogglePlay,
      openPlayer: mockOpenPlayer
    });

    render(<HeroSection {...defaultProps} />);

    const button = screen.getByTestId('hero-playback-button');
    fireEvent.click(button);

    expect(mockTogglePlay).toHaveBeenCalledTimes(1);
    expect(mockOpenPlayer).toHaveBeenCalledTimes(1);
  });
});
