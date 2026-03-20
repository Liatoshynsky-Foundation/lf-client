import { act, render, screen } from '@testing-library/react';
import React from 'react';

import FoundationSection from './FoundationSection';

jest.mock('~/components/image-with-caption/ImageWithCaption', () => {
  return function MockImageWithCaption(props: { alt?: string; caption?: string; src?: string }) {
    return (
      <div data-testid="image-with-caption">
        <img src={props.src} alt={props.alt} />
        {props.caption && <span>{props.caption}</span>}
      </div>
    );
  };
});

jest.mock('~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => {
  return function MockButtonContentBlock(props: { buttonText: string; link?: string }) {
    return (
      <a href={props.link} data-testid="button-content-block">
        {props.buttonText}
      </a>
    );
  };
});

describe('FoundationSection', () => {
  const mockParagraph1 = 'First paragraph content';
  const mockParagraph2 = 'Second paragraph content';

  const defaultProps = {
    imageSrc: '/test-image.jpg',
    caption: 'Test caption',
    paragraph1: mockParagraph1,
    buttonText: 'Learn More',
    buttonLink: '/test-link'
  };

  it('should render without crashing', () => {
    render(<FoundationSection {...defaultProps} />);
    expect(screen.getByAltText('Foundation')).toBeInTheDocument();
  });

  it('should display the image with correct src', () => {
    render(<FoundationSection {...defaultProps} />);
    const image = screen.getByAltText('Foundation');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should render first paragraph correctly', () => {
    render(<FoundationSection {...defaultProps} />);
    expect(screen.getByText(mockParagraph1)).toBeInTheDocument();
  });

  it('should render button with correct text', () => {
    render(<FoundationSection {...defaultProps} />);
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('should pass correct link to button', () => {
    render(<FoundationSection {...defaultProps} />);
    const button = screen.getByTestId('button-content-block');
    expect(button).toHaveAttribute('href', '/test-link');
  });

  it('should render with paragraph2', () => {
    render(<FoundationSection {...defaultProps} paragraph2={mockParagraph2} />);

    expect(screen.getByText(mockParagraph1)).toBeInTheDocument();
    expect(screen.getByText(mockParagraph2)).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('should render without paragraph2', () => {
    render(<FoundationSection {...defaultProps} />);

    expect(screen.getByText(mockParagraph1)).toBeInTheDocument();
    expect(screen.queryByText(mockParagraph2)).not.toBeInTheDocument();
  });

  it('should render without caption', () => {
    const { caption, ...propsWithoutCaption } = defaultProps;

    render(<FoundationSection {...propsWithoutCaption} />);

    expect(screen.getByAltText('Foundation')).toBeInTheDocument();
    expect(screen.queryByText(caption)).not.toBeInTheDocument();
  });

  it('should calculate dynamic padding correctly on render and resize', async () => {
    const offsetHeightSpy = jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (
      this: HTMLElement
    ) {
      if (this.dataset.testid === 'paragraph2') return 100;
      if (this.dataset.testid === 'button-wrapper') return 48;
      return 0;
    });

    const { unmount } = render(<FoundationSection {...defaultProps} paragraph2={mockParagraph2} />);

    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });

    const stickyWrapper = screen.getByTestId('sticky-wrapper');
    expect(stickyWrapper).toHaveAttribute('data-padding', '52');

    offsetHeightSpy.mockRestore();
    unmount();
  });

  it('should remove resize listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<FoundationSection {...defaultProps} paragraph2={mockParagraph2} />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
