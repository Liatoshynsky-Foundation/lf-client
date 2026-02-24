import { render, screen } from '@testing-library/react';

import EventSection from './EventSection';

jest.mock('~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => {
  return function MockButtonContentBlock({ buttonText, content }: any) {
    return (
      <div data-testid="mock-button-content-block">
        <button>{buttonText}</button>
        <div>{typeof content === 'string' ? content : 'Опис секції подій'}</div>
      </div>
    );
  };
});

const mockEvents = [
  {
    id: '1',
    date: '29.02 - 02.03 2024',
    title: 'Test Event 1',
    description: 'Description 1',
    image: '/test-img-1.jpg',
    publishDate: '01.01.2024',
    regLink: 'https://test.com/reg'
  },
  {
    id: '2',
    date: '15.05 2024',
    title: 'Test Event 2',
    description: 'Description 2',
    image: '/test-img-2.jpg',
    publishDate: '10.01.2024'
  }
];

const defaultProps = {
  title: 'Блок Подій',
  text: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Опис секції подій' }] }]
  } as any,
  ctaLabel: 'Всі події',
  ctaHref: '/events',
  publishDateLabel: 'Дата публікації',
  viewLabel: 'Дивитись',
  regLabel: 'Реєстрація',
  events: mockEvents
};

describe('EventSection', () => {
  it('should render the main title and section description', () => {
    render(<EventSection {...defaultProps} />);
    expect(screen.getByText('Блок Подій')).toBeInTheDocument();
    expect(screen.getByText('Опис секції подій')).toBeInTheDocument();
  });

  it('should render the list of events (up to 3)', () => {
    render(<EventSection {...defaultProps} />);
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(2);
  });

  it('should correctly display the publish date with label', () => {
    render(<EventSection {...defaultProps} />);
    expect(screen.getByText('Дата публікації: 01.01.2024')).toBeInTheDocument();
  });

  it('should show registration button only if regLink is provided', () => {
    render(<EventSection {...defaultProps} />);
    const regButtons = screen.getAllByText('Реєстрація');
    expect(regButtons.length).toBe(1);
  });

  it('should have the correct href attribute for the main CTA button', () => {
    render(<EventSection {...defaultProps} />);
    const ctaButton = screen.getByRole('link', { name: /Всі події/i });
    expect(ctaButton).toHaveAttribute('href', '/events');
  });

  it('should limit the number of displayed events to 3', () => {
    const manyEvents = Array(5)
      .fill(mockEvents[0])
      .map((ev, i) => ({ ...ev, id: `${i}` }));
    render(<EventSection {...defaultProps} events={manyEvents} />);
    const viewButtons = screen.getAllByText('Дивитись');
    expect(viewButtons.length).toBe(3);
  });
});
