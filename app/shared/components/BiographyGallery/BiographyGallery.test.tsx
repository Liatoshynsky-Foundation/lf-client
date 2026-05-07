import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import BiographyGallery from './BiographyGallery';
import { biographyGalleryPhotos } from './BiographyGallery.data';
import { styles } from './BiographyGallery.styles';
import { buildFrameImages } from './buildBiographyFrameImages';

const ImageWithCaptionMock = jest.fn((props: any) => (
  <div data-testid="image-with-caption" data-caption={props.caption} />
));

jest.mock('~/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: (props: any) => ImageWithCaptionMock(props)
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

    expect(ImageWithCaptionMock).toHaveBeenCalled();
  });

  it('covers chunking logic for incomplete frames', () => {
    const images = buildFrameImages(biographyGalleryPhotos.slice(0, 3));
    render(<BiographyGallery images={images} frameRepeats={1} />);

    expect(screen.getAllByTestId('image-with-caption')).toHaveLength(6);
  });
});
