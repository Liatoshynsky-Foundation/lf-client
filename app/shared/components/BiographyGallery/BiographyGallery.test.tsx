import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import BiographyGallery from './BiographyGallery';
import { biographyGalleryPhotos } from './BiographyGallery.data';
import { styles } from './BiographyGallery.styles';
import { buildFrameImages } from './buildBiographyFrameImages';

type MockImageProps = {
  caption?: string;
};

const ImageWithCaptionMock = jest.fn(({ caption }: MockImageProps) => (
  <div data-testid="image-with-caption" data-caption={caption} />
));

jest.mock('~/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: (props: MockImageProps) => ImageWithCaptionMock(props)
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'uk'
}));

describe('BiographyGallery Folder 100% Coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('covers everything: component, styles, data and builder', () => {
    const images = buildFrameImages(biographyGalleryPhotos.slice(0, 5));

    render(<BiographyGallery images={images} frameRepeats={1} durationSec={30} />);

    styles.track(30, true);
    styles.track(60, false);

    expect(screen.getByTestId('BiographyGallery')).toBeInTheDocument();
  });

  it('covers hover logic and paused state', () => {
    const images = buildFrameImages(biographyGalleryPhotos.slice(0, 1));
    render(<BiographyGallery images={images} />);

    const photoWrappers = screen.getAllByTestId(/BiographyGallery-photoWrapper/);
    const firstWrapper = photoWrappers[0];

    fireEvent.mouseEnter(firstWrapper);
    fireEvent.mouseLeave(firstWrapper);

    act(() => {
      fireEvent.focus(firstWrapper);
    });

    act(() => {
      fireEvent.blur(firstWrapper);
    });

    expect(ImageWithCaptionMock).toHaveBeenCalled();
  });

  it('marks primary photo wrappers as focusable and duplicates as inert', () => {
    const images = buildFrameImages(biographyGalleryPhotos.slice(0, 1));
    render(<BiographyGallery images={images} frameRepeats={1} />);

    const wrappers = screen.getAllByTestId(/BiographyGallery-photoWrapper/);
    const primary = wrappers.slice(0, wrappers.length / 2);
    const duplicates = wrappers.slice(wrappers.length / 2);

    primary.forEach((el) => {
      expect(el).toHaveAttribute('tabindex', '0');
      expect(el).toHaveAttribute('data-biography-photo', 'true');
    });
    duplicates.forEach((el) => {
      expect(el).toHaveAttribute('tabindex', '-1');
      expect(el).not.toHaveAttribute('data-biography-photo');
    });
  });

  it('moves focus between primary photos on ArrowRight and ArrowLeft, wrapping at the edges', () => {
    const images = buildFrameImages(biographyGalleryPhotos.slice(0, 3));
    render(<BiographyGallery images={images} frameRepeats={1} />);

    const focusables = document.querySelectorAll<HTMLDivElement>('[data-biography-photo="true"]');
    expect(focusables.length).toBe(3);

    act(() => {
      focusables[0].focus();
    });
    fireEvent.keyDown(focusables[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(focusables[1]);

    fireEvent.keyDown(focusables[1], { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(focusables[0]);

    fireEvent.keyDown(focusables[0], { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(focusables[2]);

    fireEvent.keyDown(focusables[2], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(focusables[0]);
  });

  it('ignores non-arrow keys in keyboard handler', () => {
    const images = buildFrameImages(biographyGalleryPhotos.slice(0, 2));
    render(<BiographyGallery images={images} frameRepeats={1} />);

    const focusables = document.querySelectorAll<HTMLDivElement>('[data-biography-photo="true"]');
    act(() => {
      focusables[0].focus();
    });
    fireEvent.keyDown(focusables[0], { key: 'Enter' });

    expect(document.activeElement).toBe(focusables[0]);
  });

  it('covers chunking logic for incomplete frames', () => {
    const images = buildFrameImages(biographyGalleryPhotos.slice(0, 3));
    render(<BiographyGallery images={images} frameRepeats={1} />);

    expect(screen.getAllByTestId('image-with-caption')).toHaveLength(6);
  });

  it('exposes the gallery as a labelled group for screen readers', () => {
    const images = buildFrameImages(biographyGalleryPhotos.slice(0, 1));
    render(<BiographyGallery images={images} frameRepeats={1} />);

    const root = screen.getByTestId('BiographyGallery');

    expect(root).toHaveAttribute('role', 'group');
    expect(root).toHaveAttribute('aria-roledescription', 'roleDescription');
    expect(root).toHaveAttribute('aria-label', 'navigationHint');
  });

  it('labels each photo wrapper as an image for assistive technologies', () => {
    const images = buildFrameImages(biographyGalleryPhotos.slice(0, 1));
    render(<BiographyGallery images={images} frameRepeats={1} />);

    const wrappers = screen.getAllByTestId(/BiographyGallery-photoWrapper/);

    wrappers.forEach((wrapper) => {
      expect(wrapper).toHaveAttribute('role', 'img');
      expect(wrapper.getAttribute('aria-label')).toBeTruthy();
    });
  });
});
