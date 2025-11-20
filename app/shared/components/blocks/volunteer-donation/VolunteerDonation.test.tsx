import { render, screen } from '@testing-library/react';
import React from 'react';

import VolunteerDonation from './VolunteerDonation';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/components/copy-button/CopyButton', () => ({
  CopyButton: ({ hint }: { hint: string }) => <button aria-label="Copy content">{hint}</button>
}));

jest.mock('~/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
    <div data-testid="image-with-caption">
      <img src={src} alt={alt} />
      {caption && <span>{caption}</span>}
    </div>
  )
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <h2 data-testid="section-title">{title}</h2>
}));

describe('VolunteerDonation', () => {
  const mockProps = {
    title: 'Support Our Cause',
    paymentMethods: [
      { label: 'PayPal', value: 'paypal@example.com' },
      { label: 'Bank Transfer', value: 'bank@example.com' }
    ],
    imageSrc: '/images/volunteer.jpg',
    caption: 'Volunteer making a difference'
  };

  it('should render the component with all required props', () => {
    render(<VolunteerDonation {...mockProps} />);

    expect(screen.getByTestId('section-title')).toBeInTheDocument();
    expect(screen.getByText('Support Our Cause')).toBeInTheDocument();
    expect(screen.getByTestId('image-with-caption')).toBeInTheDocument();
  });

  it('should render section title correctly', () => {
    render(<VolunteerDonation {...mockProps} />);

    const sectionTitle = screen.getByTestId('section-title');
    expect(sectionTitle).toHaveTextContent('Support Our Cause');
  });

  it('should render all payment methods', () => {
    render(<VolunteerDonation {...mockProps} />);

    expect(screen.getByText('PayPal:')).toBeInTheDocument();
    expect(screen.getByText('paypal@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bank Transfer:')).toBeInTheDocument();
    expect(screen.getByText('bank@example.com')).toBeInTheDocument();
  });

  it('should render payment methods with correct data', () => {
    render(<VolunteerDonation {...mockProps} />);

    expect(screen.getByText('paypal@example.com')).toBeInTheDocument();
    expect(screen.getByText('bank@example.com')).toBeInTheDocument();
  });

  it('should render copy buttons for each payment method', () => {
    render(<VolunteerDonation {...mockProps} />);

    const copyButtons = screen.getAllByRole('button', { name: /copy content/i });
    expect(copyButtons).toHaveLength(2);
    expect(copyButtons[0]).toHaveTextContent('copied');
    expect(copyButtons[1]).toHaveTextContent('copied');
  });

  it('should render image with caption', () => {
    render(<VolunteerDonation {...mockProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/volunteer.jpg');
    expect(image).toHaveAttribute('alt', 'Support Our Cause');
    expect(screen.getByText('Volunteer making a difference')).toBeInTheDocument();
  });

  it('should render image without caption when caption is not provided', () => {
    const propsWithoutCaption = { ...mockProps, caption: undefined };
    render(<VolunteerDonation {...propsWithoutCaption} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(screen.queryByText('Volunteer making a difference')).not.toBeInTheDocument();
  });

  it('should handle empty payment methods array', () => {
    const propsWithNoMethods = { ...mockProps, paymentMethods: [] };
    render(<VolunteerDonation {...propsWithNoMethods} />);

    const copyButtons = screen.queryAllByRole('button', { name: /copy content/i });
    expect(copyButtons).toHaveLength(0);
  });

  it('should render single payment method', () => {
    const propsWithOneMethod = {
      ...mockProps,
      paymentMethods: [{ label: 'PayPal', value: 'paypal@example.com' }]
    };
    render(<VolunteerDonation {...propsWithOneMethod} />);

    expect(screen.getByText('PayPal:')).toBeInTheDocument();
    expect(screen.getByText('paypal@example.com')).toBeInTheDocument();
    const copyButtons = screen.getAllByRole('button', { name: /copy content/i });
    expect(copyButtons).toHaveLength(1);
  });

  it('should use title as image alt text', () => {
    const customTitle = 'Custom Donation Title';
    render(<VolunteerDonation {...mockProps} title={customTitle} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', customTitle);
  });
});
