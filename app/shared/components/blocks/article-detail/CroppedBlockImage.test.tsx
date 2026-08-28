import { fireEvent, render, screen } from '@testing-library/react';

import { CroppedBlockImage } from './CroppedBlockImage';
import { loggerErrors } from '~/constants/errors';

import { useImageCrop } from '~/shared/hooks/use-image-crop/useImageCrop';

jest.mock('@mui/material', () => ({
  Box: ({ sx, children, ...props }: any) => {
    const style: React.CSSProperties = {};
    const dataAttrs: Record<string, string> = {};
    if (sx?.maxWidth !== undefined) {
      style.maxWidth = typeof sx.maxWidth === 'number' ? `${sx.maxWidth}px` : String(sx.maxWidth);
      dataAttrs['data-max-width'] = style.maxWidth!;
    }
    if (sx?.aspectRatio !== undefined) {
      dataAttrs['data-aspect-ratio'] = String(sx.aspectRatio);
    }
    return (
      <div style={style} {...dataAttrs} {...props}>
        {children}
      </div>
    );
  },
  Typography: ({ children, component: Component = 'span', sx: _sx, variant: _v, ...props }: any) => (
    <Component {...props}>{children}</Component>
  )
}));

jest.mock('~/shared/hooks/use-image-crop/useImageCrop');

const mockHandleImageLoad = jest.fn();
const mockCroppedImgStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const mockedUseImageCrop = useImageCrop as jest.MockedFunction<typeof useImageCrop>;

beforeEach(() => {
  mockedUseImageCrop.mockReturnValue({
    containerRef: { current: null } as unknown as React.RefObject<HTMLDivElement>,
    imgRef: { current: null } as unknown as React.RefObject<HTMLImageElement>,
    handleImageLoad: mockHandleImageLoad,
    croppedImgStyle: mockCroppedImgStyle
  });
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

const defaultProps = {
  src: 'https://example.com/photo.jpg',
  alt: 'A photo',
  caption: 'Photo caption',
  cropData: '{}',
  blockWidth: 512
};

describe('CroppedBlockImage', () => {
  describe('image rendering', () => {
    it('renders img with correct src and alt', () => {
      render(<CroppedBlockImage {...defaultProps} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', defaultProps.src);
      expect(img).toHaveAttribute('alt', defaultProps.alt);
    });

    it('renders img with loading="lazy"', () => {
      render(<CroppedBlockImage {...defaultProps} />);

      expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy');
    });

    it('applies croppedImgStyle from useImageCrop to img', () => {
      render(<CroppedBlockImage {...defaultProps} />);

      const img = screen.getByRole('img');
      expect(img).toHaveStyle({ position: 'absolute', objectFit: 'cover' });
    });

    it('calls handleImageLoad when image fires onLoad', () => {
      render(<CroppedBlockImage {...defaultProps} />);

      fireEvent.load(screen.getByRole('img'));
      expect(mockHandleImageLoad).toHaveBeenCalledTimes(1);
    });
  });

  describe('caption', () => {
    it('renders figcaption when caption is provided', () => {
      render(<CroppedBlockImage {...defaultProps} caption="My caption" />);

      expect(screen.getByText('My caption')).toBeInTheDocument();
    });

    it('does not render figcaption when caption is empty string', () => {
      render(<CroppedBlockImage {...defaultProps} caption="" />);

      expect(screen.queryByRole('figure')).not.toBeInTheDocument();
      expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
    });
  });

  describe('parseCrop — cropData passed to useImageCrop', () => {
    it('passes null when cropData is an empty object', () => {
      render(<CroppedBlockImage {...defaultProps} cropData="{}" />);

      expect(mockedUseImageCrop).toHaveBeenCalledWith(null);
    });

    it('passes null when cropData is invalid JSON', () => {
      render(<CroppedBlockImage {...defaultProps} cropData="not-json" />);

      expect(mockedUseImageCrop).toHaveBeenCalledWith(null);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(loggerErrors.CROP_DATA_PARSE_FAILED, expect.any(Error));
    });

    it('passes null when rect is missing from cropData', () => {
      render(<CroppedBlockImage {...defaultProps} cropData='{"other":123}' />);

      expect(mockedUseImageCrop).toHaveBeenCalledWith(null);
    });

    it('passes null when rect fields are not numbers', () => {
      render(<CroppedBlockImage {...defaultProps} cropData='{"rect":{"x":"a","y":"b","width":"c","height":"d"}}' />);

      expect(mockedUseImageCrop).toHaveBeenCalledWith(null);
    });

    it('passes null when rect is missing some numeric fields', () => {
      render(<CroppedBlockImage {...defaultProps} cropData='{"rect":{"x":10,"y":20}}' />);

      expect(mockedUseImageCrop).toHaveBeenCalledWith(null);
    });

    it('passes parsed CropRect when cropData has valid rect', () => {
      const cropData = '{"rect":{"x":10,"y":20,"width":100,"height":80}}';
      render(<CroppedBlockImage {...defaultProps} cropData={cropData} />);

      expect(mockedUseImageCrop).toHaveBeenCalledWith({ x: 10, y: 20, width: 100, height: 80 });
    });

    it('passes parsed CropRect with float values', () => {
      const cropData = '{"rect":{"x":356.67,"y":0,"width":200,"height":250}}';
      render(<CroppedBlockImage {...defaultProps} cropData={cropData} />);

      expect(mockedUseImageCrop).toHaveBeenCalledWith({ x: 356.67, y: 0, width: 200, height: 250 });
    });
  });

  describe('container styles', () => {
    it('applies blockWidth as maxWidth on the container', () => {
      const { container } = render(<CroppedBlockImage {...defaultProps} blockWidth={800} />);

      const innerBox = container.querySelector('[data-max-width]') as HTMLElement | null;
      expect(innerBox?.dataset.maxWidth).toBe('800px');
    });

    it('applies 600/400 aspectRatio on the container', () => {
      const { container } = render(<CroppedBlockImage {...defaultProps} />);

      const innerBox = container.querySelector('[data-aspect-ratio]') as HTMLElement | null;
      expect(innerBox?.dataset.aspectRatio).toBe('600 / 400');
    });
  });
});
