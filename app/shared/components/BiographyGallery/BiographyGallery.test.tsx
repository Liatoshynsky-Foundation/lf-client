import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import BiographyGallery from './BiographyGallery';

const trackMock = jest.fn<any, [number, boolean]>(() => ({}));

jest.mock('./BiographyGallery.styles', () => ({
  styles: {
    root: {},
    frame: {},
    imageWrapper: {},
    captionBase: {},
    captionAnimated: {},
    track: (durationSec: number, paused: boolean) => trackMock(durationSec, paused)
  }
}));

const ImageWithCaptionMock = jest.fn((props: any) => {
  return (
    <div
      data-testid="image-with-caption"
      data-src={props.src}
      data-caption={typeof props.caption === 'string' ? props.caption : 'localized'}
    />
  );
});

jest.mock('~/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: (props: any) => ImageWithCaptionMock(props)
}));

function makeImages(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `img-${i + 1}`,
    src: `/img/${i + 1}.png`,
    alt: { en: `Alt ${i + 1}` },
    caption: i % 3 === 0 ? { en: `Cap ${i + 1}` } : null,
    sizes: {
      width: { xs: 100, md: 120, lg: 140 },
      height: { xs: 80, md: 90, lg: 100 }
    },
    alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
    ml: i % 5 >= 2 ? 3 : 0
  }));
}

describe('BiographyGallery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('chunks images into frames of 5 and duplicates frames A/B', () => {
    const images = makeImages(10);
    render(<BiographyGallery images={images as any} frameRepeats={2} durationSec={60} />);

    expect(ImageWithCaptionMock).toHaveBeenCalledTimes(20);
  });

  it('uses NBSP placeholder for null captions', () => {
    const images = makeImages(5);
    render(<BiographyGallery images={images as any} frameRepeats={1} durationSec={60} />);

    const propsList = ImageWithCaptionMock.mock.calls.map((c) => c[0]);

    const nullCaptionCalls = propsList.filter((p) => p.caption === '\u00A0');
    expect(nullCaptionCalls.length).toBeGreaterThan(0);

    const realCaptionCalls = propsList.filter((p) => p.caption && p.caption !== '\u00A0');
    expect(realCaptionCalls.length).toBeGreaterThan(0);
  });

  it('toggles paused on hover (verified via styles.track calls)', () => {
    const images = makeImages(5);

    render(<BiographyGallery images={images as any} frameRepeats={1} durationSec={60} />);

    expect(trackMock).toHaveBeenCalled();
    const initialCall = trackMock.mock.calls[trackMock.mock.calls.length - 1];
    expect(initialCall[0]).toBe(60);
    expect(initialCall[1]).toBe(false);

    const nodes = screen.getAllByTestId('image-with-caption');
    expect(nodes.length).toBeGreaterThan(0);

    const wrapper = nodes[0].parentElement as HTMLElement;
    fireEvent.mouseEnter(wrapper);

    const afterEnter = trackMock.mock.calls[trackMock.mock.calls.length - 1];
    expect(afterEnter[1]).toBe(true);

    fireEvent.mouseLeave(wrapper);

    const afterLeave = trackMock.mock.calls[trackMock.mock.calls.length - 1];
    expect(afterLeave[1]).toBe(false);
  });
});
