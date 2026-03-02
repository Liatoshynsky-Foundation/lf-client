import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('next-intl', () => ({
  useLocale: () => 'en'
}));

jest.mock('~/components/BiographyGallery/buildBiographyFrameImages', () => ({
  buildFrameImages: jest.fn()
}));

jest.mock('~/components/BiographyGallery/BiographyGallery.data', () => ({
  biographyGalleryPhotos: [{ id: 'p1' }, { id: 'p2' }]
}));

import { biographyGalleryPhotos } from '~/components/BiographyGallery/BiographyGallery.data';
import { buildFrameImages } from '~/components/BiographyGallery/buildBiographyFrameImages';

const BiographyGalleryMock = jest.fn((props: any) => (
  <div data-testid="BiographyGallery-mock" data-images-count={props.images?.length ?? 0} />
));

jest.mock('~/components/BiographyGallery/BiographyGallery', () => ({
  __esModule: true,
  default: (props: any) => BiographyGalleryMock(props)
}));

jest.mock('~/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="ButtonContentBlock-mock" data-href={props.link} data-buttontext={props.buttonText} />
  )
}));

import BiographySection from './BiographySection';

describe('BiographySection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders localized title/spanText and passes images to BiographyGallery', () => {
    const builtImages = [
      {
        id: 'img-1',
        src: '/x.png',
        alt: { en: 'alt' },
        caption: null,
        sizes: { width: { xs: 100 }, height: { xs: 80 } },
        alignSelf: 'flex-start',
        ml: 0
      }
    ];

    const buildFrameImagesMock = buildFrameImages as jest.Mock;
    buildFrameImagesMock.mockReturnValueOnce(builtImages);

    render(
      <BiographySection
        title={{ en: 'Who Was Borys Liatoshynsky?', uk: '...' } as any}
        spanText={{ en: 'Biography', uk: '...' } as any}
        text={{ en: { type: 'doc', content: [] }, uk: { type: 'doc', content: [] } } as any}
        ctaLabel={{ en: 'View biography', uk: '...' } as any}
        ctaHref="/bio"
      />
    );

    expect(screen.getByTestId('BiographySection')).toBeInTheDocument();
    expect(screen.getByTestId('BiographySection-contentContainer')).toBeInTheDocument();
    expect(screen.getByTestId('BiographySection-titleContainer')).toBeInTheDocument();

    expect(screen.getByText('Biography')).toBeInTheDocument();
    expect(screen.getByText('Who Was Borys Liatoshynsky?')).toBeInTheDocument();

    const btn = screen.getByTestId('ButtonContentBlock-mock');
    expect(btn).toHaveAttribute('data-href', '/bio');
    expect(btn).toHaveAttribute('data-buttontext', 'View biography');

    expect(buildFrameImagesMock).toHaveBeenCalledWith(biographyGalleryPhotos);

    expect(BiographyGalleryMock).toHaveBeenCalled();
    const firstCallProps = BiographyGalleryMock.mock.calls[0][0];
    expect(firstCallProps.images).toEqual(builtImages);

    expect(screen.getByTestId('BiographyGallery-mock')).toHaveAttribute('data-images-count', '1');
  });
});
