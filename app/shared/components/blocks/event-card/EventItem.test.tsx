import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import EventItem, { type EventItemProps } from './EventItem';
import { MOCK_EVENT_ITEMS } from './EventItem.fixture';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    onError
  }: {
    src: string;
    alt: string;
    onError?: React.ReactEventHandler<HTMLImageElement>;
  }) => <img src={src} alt={alt} data-testid="next-image" onError={onError} />
}));

const observeMock = jest.fn();
const unobserveMock = jest.fn();
const disconnectMock = jest.fn();

globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: observeMock,
  unobserve: unobserveMock,
  disconnect: disconnectMock
}));

let mockLocale = 'uk';

jest.mock('next-intl', () => ({
  __esModule: true,
  useLocale: () => mockLocale,
  useTranslations: () => (key: string) => {
    if (key === 'publishedAtLabel') {
      return 'Опубліковано:';
    }

    return key;
  }
}));

describe('EventItem', () => {
  const baseProps: EventItemProps = {
    ...MOCK_EVENT_ITEMS[0].props,
    image: {
      ...MOCK_EVENT_ITEMS[0].props.image,
      src: '/images/test.png'
    }
  };

  const assertTwoTimeElementsWithDate = (expectedDate: string) => {
    const dateBlock = screen.getByTestId('EventItem-dateBlock');
    expect(dateBlock).toBeInTheDocument();

    const timeElements = dateBlock.querySelectorAll('time');
    expect(timeElements).toHaveLength(2);
    timeElements.forEach((element) => {
      expect(element).toHaveAttribute('dateTime', expectedDate);
    });

    return dateBlock;
  };

  const expectNoStatusOrDates = (dateBlock: HTMLElement) => {
    expect(screen.queryByTestId('EventItem-status')).toBeNull();
    expect(screen.queryByTestId('EventItem-dateRange')).toBeNull();
    expect(screen.queryByTestId('EventItem-year')).toBeNull();
    expect(dateBlock.querySelectorAll('time')).toHaveLength(0);
    expect(dateBlock).not.toHaveAttribute('aria-label');
  };

  it('renders main content for an active event with a date range', () => {
    render(<EventItem {...baseProps} />);

    expect(screen.getByTestId('EventItem-root')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: baseProps.title
      })
    ).toBeInTheDocument();

    expect(screen.getByTestId('EventItem-publishedAt')).toHaveTextContent('Опубліковано: 15.01.26');

    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
    expect(screen.getByAltText(baseProps.image.alt)).toBeInTheDocument();
  });

  it('renders a multi-day date range in the correct format', () => {
    const props: EventItemProps = {
      ...baseProps,
      statusLabel: undefined,
      date: {
        startDate: '2024-02-29',
        endDate: '2024-03-01'
      }
    };

    render(<EventItem {...props} />);

    const dateBlock = assertTwoTimeElementsWithDate('2024-02-29');

    expect(screen.getByTestId('EventItem-dateRange')).toHaveTextContent('29.02 – 01.03');
    expect(screen.getByTestId('EventItem-year')).toHaveTextContent('2024');
    expect(dateBlock).toHaveAttribute('aria-label', '29.02 – 01.03 2024');
  });

  it('renders numeric date range across different years', () => {
    const props: EventItemProps = {
      ...baseProps,
      statusLabel: undefined,
      date: {
        startDate: '2023-12-30',
        endDate: '2024-01-02'
      }
    };

    render(<EventItem {...props} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');
    const timeElements = dateBlock.querySelectorAll('time');

    expect(timeElements).toHaveLength(1);
    expect(timeElements[0]).toHaveAttribute('dateTime', '2023-12-30');

    expect(screen.getByTestId('EventItem-dateRange')).toHaveTextContent('30.12.2023 –02.01.2024');
    expect(screen.queryByTestId('EventItem-year')).toBeNull();
    expect(dateBlock).toHaveAttribute('aria-label', '30.12.2023 –\n02.01.2024');
  });

  it('renders a single-day date correctly when endDate is not provided', () => {
    const props: EventItemProps = {
      ...baseProps,
      statusLabel: undefined,
      date: {
        startDate: '2024-03-05'
      }
    };

    render(<EventItem {...props} />);

    expect(screen.getByTestId('EventItem-dateRange')).toHaveTextContent(/БЕРЕЗНЯ/i);
    expect(screen.getByTestId('EventItem-year')).toHaveTextContent('2024');
  });

  it('renders no date or status when neither is provided', () => {
    const props: EventItemProps = {
      ...baseProps,
      date: undefined,
      statusLabel: undefined
    };

    render(<EventItem {...props} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');

    expectNoStatusOrDates(dateBlock);
  });

  it('renders primary and secondary CTAs when two actions are provided', () => {
    const twoActionsProps: EventItemProps = {
      ...MOCK_EVENT_ITEMS[1].props,
      image: { ...MOCK_EVENT_ITEMS[1].props.image, src: '/images/test.png' }
    };
    render(<EventItem {...twoActionsProps} />);

    const [primaryAction, secondaryAction] = twoActionsProps.actions!;

    const primaryLink = screen.getByText(primaryAction.label).closest('a');
    expect(primaryLink).not.toBeNull();
    expect(primaryLink).toHaveAttribute('href', primaryAction.href);

    const secondaryLink = screen.getByText(secondaryAction.label).closest('a');
    expect(secondaryLink).not.toBeNull();
    expect(secondaryLink).toHaveAttribute('href', secondaryAction.href);
  });

  it('renders only primary CTA when a single action is provided', () => {
    const singleActionProps: EventItemProps = {
      ...baseProps,
      actions: baseProps.actions ? [baseProps.actions[0]] : undefined
    };

    render(<EventItem {...singleActionProps} />);

    const primaryAction = singleActionProps.actions![0];

    const primaryLink = screen.getByText(primaryAction.label).closest('a');
    expect(primaryLink).not.toBeNull();
    expect(primaryLink).toHaveAttribute('href', primaryAction.href);

    expect(screen.queryByTestId('EventItem-secondaryCta')).toBeNull();
  });

  it('does not render CTAs when actions are not provided', () => {
    const withoutActions: EventItemProps = {
      ...baseProps,
      actions: undefined
    };

    render(<EventItem {...withoutActions} />);

    expect(screen.queryByTestId('EventItem-primaryCta')).toBeNull();
    expect(screen.queryByTestId('EventItem-secondaryCta')).toBeNull();
  });

  it('renders status instead of date when statusLabel is provided', () => {
    const statusProps: EventItemProps = {
      ...baseProps,
      date: {
        startDate: '2024-03-05',
        endDate: '2024-03-06'
      },
      statusLabel: 'Завершена подія'
    };

    render(<EventItem {...statusProps} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');

    expect(screen.getByTestId('EventItem-status')).toHaveTextContent('Завершена подія');

    dateBlock.querySelectorAll('time').forEach((el) => {
      expect(el).not.toBeInTheDocument();
    });
    expect(screen.queryByTestId('EventItem-dateRange')).toBeNull();
    expect(screen.queryByTestId('EventItem-year')).toBeNull();

    expect(dateBlock).toHaveAttribute('aria-label', 'Завершена подія');
  });

  it('does not make the left date/status block clickable', () => {
    render(<EventItem {...baseProps} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');
    expect(dateBlock.querySelector('a')).toBeNull();
  });

  it('does not render dates when startDate is invalid ISO', () => {
    const props: EventItemProps = {
      ...baseProps,
      statusLabel: undefined,
      date: {
        startDate: 'not-a-date'
      }
    };

    render(<EventItem {...props} />);

    const dateBlock = screen.getByTestId('EventItem-dateBlock');

    expectNoStatusOrDates(dateBlock);
  });

  it('falls back to raw publishedAt string when formatIsoDateToDdMmYy returns null', () => {
    const props: EventItemProps = { ...baseProps, publishedAt: 'invalid-date-string' };

    render(<EventItem {...props} />);

    expect(screen.getByTestId('EventItem-publishedAt')).toHaveTextContent('Опубліковано: invalid-date-string');
  });

  it('triggers console.warn and applies fallback on invalid url text scheme to cover line 29-30', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const props: EventItemProps = {
      ...baseProps,
      image: { ...baseProps.image, src: 'http_invalid_:\\\\example.com' }
    };

    render(<EventItem {...props} />);

    expect(warnSpy).toHaveBeenCalled();
    const img = screen.getByAltText(baseProps.image.alt);
    expect(img).toHaveAttribute('src', '/images/media-card-placeholder.png');
    warnSpy.mockRestore();
  });

  describe('Crop functionality', () => {
    beforeEach(() => {
      observeMock.mockClear();
      unobserveMock.mockClear();
      disconnectMock.mockClear();
    });

    afterEach(() => {
      Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { configurable: true, get: () => 0 });
      Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { configurable: true, get: () => 0 });
    });

    it('should render native img when crop is provided', () => {
      const crop = { x: 0, y: 0, width: 200, height: 150 };
      const props = { ...baseProps, image: { ...baseProps.image, crop } };

      render(<EventItem {...props} />);

      const img = screen.getByRole('img', { name: baseProps.image.alt });
      expect(img.tagName).toBe('IMG');
      expect(img).toHaveAttribute('src', baseProps.image.src);
      expect(img).toHaveAttribute('alt', baseProps.image.alt);
      expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
    });

    it('should render Next.js Image when crop is null', () => {
      const props = { ...baseProps, image: { ...baseProps.image, crop: null } };
      render(<EventItem {...props} />);

      expect(screen.getByTestId('next-image')).toBeInTheDocument();
    });

    it('should disconnect ResizeObserver on unmount', () => {
      const crop = { x: 10, y: 10, width: 100, height: 100 };
      const propsWithCrop = { ...baseProps, image: { ...baseProps.image, crop } };
      const { unmount } = render(<EventItem {...propsWithCrop} />);
      unmount();
      expect(disconnectMock).toHaveBeenCalled();
    });

    it('should call handleImageLoad and apply cropped styles when image loads with sized container', () => {
      globalThis.ResizeObserver = jest.fn().mockImplementation((cb: ResizeObserverCallback) => ({
        observe: jest.fn(() => {
          cb([{ contentRect: { width: 400, height: 300 } } as ResizeObserverEntry], {} as ResizeObserver);
        }),
        unobserve: jest.fn(),
        disconnect: jest.fn()
      }));
      Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { configurable: true, get: () => 800 });
      Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { configurable: true, get: () => 600 });
      const crop = { x: 10, y: 20, width: 200, height: 150 };
      const props = { ...baseProps, image: { ...baseProps.image, crop } };
      render(<EventItem {...props} />);
      const img = screen.getByRole('img', { name: baseProps.image.alt });
      act(() => {
        fireEvent.load(img);
      });
      expect(img.style.transform).toContain('translate');
      expect(img.style.transform).toContain('scale');
      globalThis.ResizeObserver = jest
        .fn()
        .mockImplementation(() => ({ observe: observeMock, unobserve: unobserveMock, disconnect: disconnectMock }));
    });

    it('renders dates with English locale', () => {
      mockLocale = 'en';
      const props: EventItemProps = {
        ...baseProps,
        statusLabel: undefined,
        dateVariant: 'text',
        date: { startDate: '2024-03-05' }
      };

      render(<EventItem {...props} />);

      expect(screen.getByTestId('EventItem-dateRange')).toHaveTextContent(/March/i);

      mockLocale = 'uk';
    });
  });

  describe('Image error fallback', () => {
    it('should fallback to placeholder when native img fails to load (crop provided)', () => {
      const crop = { x: 0, y: 0, width: 200, height: 150 };
      const props = { ...baseProps, image: { ...baseProps.image, crop } };
      render(<EventItem {...props} />);
      const img = screen.getByRole('img', { name: baseProps.image.alt });
      fireEvent.error(img);
      const fallbackImg = screen.getByRole('img', { name: baseProps.image.alt });
      expect(fallbackImg).toHaveAttribute('src', '/images/media-card-placeholder.png');
    });

    it('should fallback to placeholder when next/image fails to load (no crop)', () => {
      const props = { ...baseProps, image: { ...baseProps.image, crop: null } };
      render(<EventItem {...props} />);
      const img = screen.getByTestId('next-image');
      fireEvent.error(img);
      expect(screen.getByTestId('next-image')).toHaveAttribute('src', '/images/media-card-placeholder.png');
    });

    it('should fallback to placeholder when image src is an empty string', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const props: EventItemProps = { ...baseProps, image: { ...baseProps.image, src: '' } };
      render(<EventItem {...props} />);
      const fallbackImg = screen.getByAltText(baseProps.image.alt);
      expect(fallbackImg).toHaveAttribute('src', '/images/media-card-placeholder.png');
      warnSpy.mockRestore();
    });

    it('renders text date range across different years', () => {
      const props: EventItemProps = {
        ...baseProps,
        statusLabel: undefined,
        dateVariant: 'text',
        date: { startDate: '2023-12-30', endDate: '2024-01-02' }
      };
      render(<EventItem {...props} />);
      expect(screen.queryByTestId('EventItem-year')).toBeNull();
      expect(screen.getByTestId('EventItem-dateRange')).toHaveTextContent(/2023/);
      expect(screen.getByTestId('EventItem-dateRange')).toHaveTextContent(/2024/);
    });

    it('should treat a full valid URL as valid image src', () => {
      const props: EventItemProps = {
        ...baseProps,
        image: { ...baseProps.image, src: 'https://example.com/image.png' }
      };
      render(<EventItem {...props} />);
      const img = screen.getByAltText(baseProps.image.alt);
      expect(img).toHaveAttribute('src', 'https://example.com/image.png');
    });

    it('renders text date range within the same year', () => {
      const props: EventItemProps = {
        ...baseProps,
        statusLabel: undefined,
        dateVariant: 'text',
        date: { startDate: '2024-03-05', endDate: '2024-03-10' }
      };
      render(<EventItem {...props} />);
      expect(screen.getByTestId('EventItem-year')).toHaveTextContent('2024');
      expect(screen.getByTestId('EventItem-dateRange')).toHaveTextContent(/БЕРЕЗНЯ/i);
    });
  });
});
