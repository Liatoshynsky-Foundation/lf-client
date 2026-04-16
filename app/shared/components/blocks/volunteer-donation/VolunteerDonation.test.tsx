import { render, screen } from '@testing-library/react';
import React from 'react';

import VolunteerDonation from './VolunteerDonation';
import { volunteerDonationData } from './volunteerDonationData';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/ds-components/copy-link/CopyLink', () => ({
  __esModule: true,
  default: (props: any) => {
    const val = props.text || props.value || props.copyText || '';
    return (
      <div data-testid="mock-copy-link" data-copy-value={val}>
        {props.children}
        <span>{val}</span>
      </div>
    );
  }
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  __esModule: true,
  default: () => <svg data-testid="colored-svg" />
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

describe('VolunteerDonation Coverage Fix', () => {
  const mockProps = {
    title: 'Support Our Cause',
    paymentMethods: [
      { label: 'PayPal', value: 'paypal@example.com' },
      { label: 'Bank Transfer', value: 'bank@example.com' }
    ],
    imageSrc: '/images/volunteer.jpg',
    caption: 'Volunteer making a difference'
  };

  it('should render correctly with REAL data from volunteerDonationData.ts', () => {
    render(<VolunteerDonation {...volunteerDonationData} />);

    expect(screen.getByTestId('section-title')).toHaveTextContent(volunteerDonationData.title);
    expect(screen.getByText(/Ukraine.resisting@gmail.com/i)).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', volunteerDonationData.imageSrc);
  });

  it('should render all payment methods', () => {
    render(<VolunteerDonation {...mockProps} />);
    expect(screen.getByText('PayPal:')).toBeInTheDocument();
    expect(screen.getByText('paypal@example.com')).toBeInTheDocument();
  });

  it('should render copy buttons for each payment method', () => {
    render(<VolunteerDonation {...mockProps} />);
    const copyButtons = screen.getAllByTestId('mock-copy-link');
    expect(copyButtons).toHaveLength(2);
    expect(copyButtons[0]).toHaveAttribute('data-copy-value', 'paypal@example.com');
  });

  it('should handle empty payment methods array', () => {
    const propsWithNoMethods = { ...mockProps, paymentMethods: [] };
    render(<VolunteerDonation {...propsWithNoMethods} />);
    expect(screen.queryByTestId('mock-copy-link')).not.toBeInTheDocument();
  });

  it('should render image without caption when caption is not provided', () => {
    const propsWithoutCaption = { ...mockProps, caption: undefined };
    render(<VolunteerDonation {...propsWithoutCaption} />);
    expect(screen.queryByText('Volunteer making a difference')).not.toBeInTheDocument();
  });
});
