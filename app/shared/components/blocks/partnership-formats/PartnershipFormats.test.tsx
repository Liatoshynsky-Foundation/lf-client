import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PartnershipFormats from './PartnershipFormats';

jest.mock('~/components/modal-component/ModalComponent', () => {
  return jest.fn(({ children, open, onClose }: any) => (
    <div data-testid="modal-component" data-open={open}>
      {open && children}
      <button onClick={onClose} data-testid="modal-close-button">
        Close
      </button>
    </div>
  ));
});

jest.mock('~/components/section-title/SectionTitle', () => {
  return jest.fn(({ title, sx }: any) => (
    <div data-testid="section-title" data-sx={JSON.stringify(sx)}>
      {title}
    </div>
  ));
});

jest.mock('~/ds-components/button/Button', () => {
  return jest.fn(({ children, onClick, variant, size, color, endIcon }: any) => (
    <button data-testid="action-button" onClick={onClick} data-variant={variant} data-size={size} data-color={color}>
      {children}
      {endIcon}
    </button>
  ));
});

jest.mock('~/ds-components/card-with-text/CardWithText', () => {
  return jest.fn(({ icon, title, list }: any) => (
    <div data-testid="card-with-text">
      {icon && <img src={icon} alt="card-icon" />}
      <div data-testid="card-title">{title}</div>
      <ul>
        {list.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  ));
});

jest.mock('~/ds-components/image-with-border/ImageWithBorder', () => {
  return jest.fn(({ image, alt, width, height, borderWidth }: any) => (
    <div data-testid="image-with-border" data-width={width} data-height={height} data-border-width={borderWidth}>
      <img src={image} alt={alt} />
    </div>
  ));
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  }
}));

jest.mock('./PartnershipSlider', () => {
  return jest.fn(({ slides }: any) => (
    <div data-testid="partnership-slider">
      {slides.map((slide: any) => {
        const key = slide.type === 'card' ? slide.card?.title : slide.image?.src;
        return (
          <div key={key} data-testid="slider-slide">
            {slide.type === 'card' && slide.card && (
              <div data-testid="card-with-text">
                {slide.card.icon && <img src={slide.card.icon} alt="card-icon" />}
                <div data-testid="card-title">{slide.card.title}</div>
                <ul>
                  {slide.card.list.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {slide.type === 'image' && slide.image && (
              <div
                data-testid="image-with-border"
                data-width={slide.image.width}
                data-height={slide.image.height}
                data-border-width={slide.image.borderWidth || 8}
              >
                <img src={slide.image.src} alt={slide.image.alt} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  ));
});

describe('PartnershipFormats', () => {
  const mockData = {
    title: 'Partnership Formats',
    firstRowFirstCard: {
      icon: '/icons/icon1.svg',
      title: 'Technical Support',
      list: ['Sound equipment', 'Online broadcasts', 'Event logistics', 'Archive digitization']
    },
    firstRowSecondCard: {
      icon: '/icons/icon2.svg',
      title: 'Information Support',
      list: ['Interviews and analytics', 'Music criticism', 'Media engagement', 'Material translations']
    },
    firstRowImage: {
      src: '/images/partnership-small.png',
      alt: 'Partnership collaboration',
      width: 294,
      height: 386,
      borderWidth: 8
    },
    secondRowImage: {
      src: '/images/partnership-large.png',
      alt: 'Team collaboration',
      width: 608,
      height: 385,
      borderWidth: 8
    },
    secondRowFirstCard: {
      icon: '/icons/icon3.svg',
      title: 'Joint Projects',
      list: [
        'Concerts and festivals',
        'Educational programs',
        'Corporate event integration',
        'International collaborations'
      ]
    },
    secondRowSecondCard: {
      icon: '/icons/icon4.svg',
      title: 'Financial Support and Patronage',
      list: ['One-time contributions', 'Regular support', 'Corporate CSR programs', 'Project-targeted funding']
    },
    descriptionText: 'We value every collaboration and support — financial, informational, expert, or technical.',
    actionButtonText: 'Offer Help',
    modalContent: <div data-testid="modal-content">Modal Content</div>
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with title', () => {
    render(<PartnershipFormats data={mockData} />);
    expect(screen.getByTestId('section-title')).toBeInTheDocument();
    expect(screen.getByTestId('section-title')).toHaveTextContent('Partnership Formats');
  });

  it('should render all first row cards', () => {
    render(<PartnershipFormats data={mockData} />);
    const cards = screen.getAllByTestId('card-with-text');
    expect(cards.length).toBeGreaterThanOrEqual(2);

    const technicalSupportCards = cards.filter((card) => within(card).queryByText('Technical Support'));
    expect(technicalSupportCards.length).toBeGreaterThanOrEqual(1);

    const technicalCard = technicalSupportCards[0];
    expect(within(technicalCard).getByTestId('card-title')).toHaveTextContent('Technical Support');
    expect(within(technicalCard).getByAltText('card-icon')).toHaveAttribute('src', '/icons/icon1.svg');
  });

  it('should render first row image', () => {
    render(<PartnershipFormats data={mockData} />);

    const partnershipImages = screen.getAllByAltText('Partnership collaboration');
    expect(partnershipImages.length).toBeGreaterThanOrEqual(1);

    const firstImage = partnershipImages[0];
    expect(firstImage).toHaveAttribute('src', '/images/partnership-small.png');
  });

  it('should render second row image', () => {
    render(<PartnershipFormats data={mockData} />);

    const teamImages = screen.getAllByAltText('Team collaboration');
    expect(teamImages.length).toBeGreaterThanOrEqual(1);

    const firstImage = teamImages[0];
    expect(firstImage).toHaveAttribute('src', '/images/partnership-large.png');
  });

  it('should render all cards including duplicated card for responsive layout', () => {
    render(<PartnershipFormats data={mockData} />);
    const cards = screen.getAllByTestId('card-with-text');

    expect(cards.length).toBeGreaterThanOrEqual(8);

    const jointProjectCards = cards.filter((card) => within(card).queryByText('Joint Projects'));
    expect(jointProjectCards.length).toBeGreaterThanOrEqual(1);
  });

  it('should render description text when provided', () => {
    render(<PartnershipFormats data={mockData} />);
    expect(screen.getByText(/We value every collaboration and support/)).toBeInTheDocument();
  });

  it('should not render description text when not provided', () => {
    const dataWithoutDescription = { ...mockData, descriptionText: undefined };
    render(<PartnershipFormats data={dataWithoutDescription} />);
    expect(screen.queryByText(/We value every collaboration and support/)).not.toBeInTheDocument();
  });

  it('should render action button when provided', () => {
    render(<PartnershipFormats data={mockData} />);
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
    expect(screen.getByTestId('action-button')).toHaveTextContent('Offer Help');
  });

  it('should not render action button when not provided', () => {
    const dataWithoutButton = { ...mockData, actionButtonText: undefined };
    render(<PartnershipFormats data={dataWithoutButton} />);
    expect(screen.queryByTestId('action-button')).not.toBeInTheDocument();
  });

  it('should open modal when action button is clicked', async () => {
    const user = userEvent.setup();
    render(<PartnershipFormats data={mockData} />);

    const modal = screen.getByTestId('modal-component');
    expect(modal).toHaveAttribute('data-open', 'false');

    const actionButton = screen.getByTestId('action-button');
    await user.click(actionButton);

    expect(modal).toHaveAttribute('data-open', 'true');
  });

  it('should close modal when close handler is called', async () => {
    const user = userEvent.setup();
    render(<PartnershipFormats data={mockData} />);

    const actionButton = screen.getByTestId('action-button');
    await user.click(actionButton);

    const modal = screen.getByTestId('modal-component');
    expect(modal).toHaveAttribute('data-open', 'true');

    const closeButton = screen.getByTestId('modal-close-button');
    await user.click(closeButton);

    expect(modal).toHaveAttribute('data-open', 'false');
  });

  it('should render modal with custom content', async () => {
    const user = userEvent.setup();
    render(<PartnershipFormats data={mockData} />);

    const actionButton = screen.getByTestId('action-button');
    await user.click(actionButton);

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toHaveTextContent('Modal Content');
  });

  it('should render modal with fallback content when modalContent is not provided', async () => {
    const user = userEvent.setup();
    const dataWithoutModalContent = { ...mockData, modalContent: undefined };
    render(<PartnershipFormats data={dataWithoutModalContent} />);

    const actionButton = screen.getByTestId('action-button');
    await user.click(actionButton);

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render cards that are not provided', () => {
    const minimalData = {
      title: 'Test Title',
      firstRowFirstCard: mockData.firstRowFirstCard
    };
    render(<PartnershipFormats data={minimalData} />);

    const cards = screen.getAllByTestId('card-with-text');

    expect(cards.length).toBe(2);

    const technicalSupportCards = cards.filter((card) => within(card).queryByText('Technical Support'));
    expect(technicalSupportCards.length).toBe(2);
  });

  it('should render button with correct props', () => {
    render(<PartnershipFormats data={mockData} />);
    const button = screen.getByTestId('action-button');
    expect(button).toHaveAttribute('data-variant', 'contained');
    expect(button).toHaveAttribute('data-size', 'medium');
    expect(button).toHaveAttribute('data-color', 'tertiary');
  });

  it('should render button with end icon', () => {
    render(<PartnershipFormats data={mockData} />);
    const button = screen.getByTestId('action-button');
    const icon = within(button).getByAltText('');
    expect(icon).toHaveAttribute('src', '/icons/arrow-up-right.svg');
  });

  it('should handle empty data gracefully', () => {
    const emptyData = { title: 'Empty State' };
    render(<PartnershipFormats data={emptyData} />);

    expect(screen.getByTestId('section-title')).toHaveTextContent('Empty State');
    expect(screen.queryByTestId('card-with-text')).not.toBeInTheDocument();
    expect(screen.queryByTestId('image-with-border')).not.toBeInTheDocument();
  });

  it('should render images with correct border width', () => {
    render(<PartnershipFormats data={mockData} />);

    const imageContainers = screen.getAllByTestId('image-with-border');
    expect(imageContainers.length).toBeGreaterThanOrEqual(2);

    for (const imageContainer of imageContainers) {
      expect(imageContainer).toHaveAttribute('data-border-width', '8');
    }
  });

  it('should render all card list items correctly', () => {
    render(<PartnershipFormats data={mockData} />);
    const cards = screen.getAllByTestId('card-with-text');

    const technicalSupportCard = cards.find((card) => within(card).queryByText('Technical Support'));

    expect(technicalSupportCard).toBeDefined();
    if (technicalSupportCard) {
      const listItems = within(technicalSupportCard).getAllByRole('listitem');
      expect(listItems).toHaveLength(4);
      expect(listItems[0]).toHaveTextContent('Sound equipment');
      expect(listItems[1]).toHaveTextContent('Online broadcasts');
    }
  });

  it('should render mobile slider with correct slides', () => {
    render(<PartnershipFormats data={mockData} />);
    const slider = screen.getByTestId('partnership-slider');
    expect(slider).toBeInTheDocument();

    const sliderSlides = within(slider).getAllByTestId('slider-slide');
    expect(sliderSlides.length).toBe(6);
  });

  it('should render mobile slider with cards and images', () => {
    render(<PartnershipFormats data={mockData} />);
    const slider = screen.getByTestId('partnership-slider');

    expect(slider).toBeInTheDocument();

    const sliderSlides = within(slider).getAllByTestId('slider-slide');
    expect(sliderSlides.length).toBe(6);

    let cardCount = 0;
    let imageCount = 0;

    for (const slide of sliderSlides) {
      if (within(slide).queryByTestId('card-with-text')) {
        cardCount++;
      }
      if (within(slide).queryByTestId('image-with-border')) {
        imageCount++;
      }
    }

    expect(cardCount).toBe(4);
    expect(imageCount).toBe(2);
  });

  it('should not render slider when no data is provided', () => {
    const emptyData = { title: 'Empty State' };
    render(<PartnershipFormats data={emptyData} />);

    const slider = screen.getByTestId('partnership-slider');
    const slides = within(slider).queryAllByTestId('slider-slide');

    expect(slides.length).toBe(0);
  });
});
