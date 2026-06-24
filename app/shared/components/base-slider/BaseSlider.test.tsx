import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { BaseSlider } from './BaseSlider';

jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-mock">{children}</div>,
  SwiperSlide: ({ children, onFocusCapture }: { children: React.ReactNode; onFocusCapture?: () => void }) => {
    const focusProps = onFocusCapture ? { onFocus: onFocusCapture } : {};

    return (
      <div data-testid="swiper-slide" {...focusProps}>
        {children}
      </div>
    );
  }
}));

jest.mock('swiper/modules', () => ({
  Navigation: {},
  Autoplay: {}
}));

interface TestItem {
  id: string;
  label: string;
}

const items: TestItem[] = [
  { id: 'a', label: 'Item A' },
  { id: 'b', label: 'Item B' },
  { id: 'c', label: 'Item C' }
];

const renderItem = (item: TestItem): React.ReactNode => <span>{item.label}</span>;
const getItemKey = (item: TestItem): string => item.id;

describe('BaseSlider', () => {
  it('should render every item through renderItem', () => {
    render(
      <BaseSlider<TestItem>
        items={items}
        renderItem={renderItem}
        getItemKey={getItemKey}
        prevLabel="Prev"
        nextLabel="Next"
      />
    );

    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByText('Item C')).toBeInTheDocument();
    expect(screen.getAllByTestId('swiper-slide')).toHaveLength(items.length);
  });

  it('should render navigation buttons with the provided labels by default', () => {
    render(
      <BaseSlider<TestItem>
        items={items}
        renderItem={renderItem}
        getItemKey={getItemKey}
        prevLabel="Previous slide"
        nextLabel="Next slide"
      />
    );

    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
  });

  it('should not render navigation buttons when showNavigation is false', () => {
    render(
      <BaseSlider<TestItem> items={items} renderItem={renderItem} getItemKey={getItemKey} showNavigation={false} />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should apply the provided data-testid', () => {
    render(
      <BaseSlider<TestItem>
        items={items}
        renderItem={renderItem}
        getItemKey={getItemKey}
        showNavigation={false}
        dataTestId="custom-slider"
      />
    );

    expect(screen.getByTestId('custom-slider')).toBeInTheDocument();
  });

  it('should call onSlideFocus with the slide index when a slide receives focus', () => {
    const onSlideFocus = jest.fn();

    render(
      <BaseSlider<TestItem>
        items={items}
        renderItem={renderItem}
        getItemKey={getItemKey}
        showNavigation={false}
        onSlideFocus={onSlideFocus}
      />
    );

    fireEvent.focus(screen.getAllByTestId('swiper-slide')[1]);

    expect(onSlideFocus).toHaveBeenCalledWith(1);
  });

  it('should derive slide keys from getItemKey', () => {
    const keySpy = jest.fn((item: TestItem): string => item.id);

    render(<BaseSlider<TestItem> items={items} renderItem={renderItem} getItemKey={keySpy} showNavigation={false} />);

    expect(keySpy).toHaveBeenCalledTimes(items.length);
  });

  it('should render when autoplay is enabled', () => {
    render(
      <BaseSlider<TestItem>
        items={items}
        renderItem={renderItem}
        getItemKey={getItemKey}
        showNavigation={false}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      />
    );

    expect(screen.getByTestId('swiper-mock')).toBeInTheDocument();
  });
});
