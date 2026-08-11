import { render, screen } from '@testing-library/react';
import React from 'react';

import VolunteerDonation from './VolunteerDonation';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

interface MockCopyLinkProps {
  value: string;
  hint?: string;
}

jest.mock('~/ds-components/copy-link/CopyLink', () => ({
  __esModule: true,
  default: (props: MockCopyLinkProps) => (
    <div data-testid="mock-copy-link" data-copy-value={props.value} data-hint={props.hint}>
      {props.value}
    </div>
  )
}));

jest.mock('~/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
    <div data-testid="image-with-caption">
      <img src={src} alt={alt} />
      {caption && <span>{caption}</span>}
    </div>
  )
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title }: { title: string | { en: string; uk: string } }) => (
    <h2 data-testid="section-title">{typeof title === 'string' ? title : title.en}</h2>
  )
}));

describe('VolunteerDonation', () => {
  const baseData = {
    title: 'Support Our Cause',
    paymentMethods: [
      { label: 'PayPal', value: 'paypal@example.com' },
      { label: 'Bank Transfer', value: 'bank@example.com' }
    ],
    imageSrc: '/images/volunteer.jpg',
    caption: 'Volunteer making a difference'
  };

  it('should render nothing when no data is provided', () => {
    const { container } = render(<VolunteerDonation />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render a string title', () => {
    render(<VolunteerDonation data={baseData} />);
    expect(screen.getByTestId('section-title')).toHaveTextContent('Support Our Cause');
  });

  it('should render an object title', () => {
    const data = { ...baseData, title: { en: 'Support Our Cause', uk: 'Підтримайте нашу справу' } };
    render(<VolunteerDonation data={data} />);
    expect(screen.getByTestId('section-title')).toHaveTextContent('Support Our Cause');
  });

  it('should render all payment methods', () => {
    render(<VolunteerDonation data={baseData} />);
    expect(screen.getByText('PayPal:')).toBeInTheDocument();
    expect(screen.getByText('Bank Transfer:')).toBeInTheDocument();
  });

  it('should render a copy link for each payment method', () => {
    render(<VolunteerDonation data={baseData} />);
    const copyLinks = screen.getAllByTestId('mock-copy-link');
    expect(copyLinks).toHaveLength(2);
    expect(copyLinks[0]).toHaveAttribute('data-copy-value', 'paypal@example.com');
  });

  it('should handle an empty payment methods array', () => {
    render(<VolunteerDonation data={{ ...baseData, paymentMethods: [] }} />);
    expect(screen.queryByTestId('mock-copy-link')).not.toBeInTheDocument();
  });

  it('should use imageSrc as-is when it starts with a slash', () => {
    render(<VolunteerDonation data={baseData} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', baseData.imageSrc);
    expect(image).toHaveAttribute('alt', 'Support Our Cause');
  });

  it('should prefer image.generatedSrc, then image.src, over imageSrc', () => {
    const data = {
      ...baseData,
      image: { src: '/images/original.jpg', generatedSrc: '/images/generated.jpg' }
    };
    render(<VolunteerDonation data={data} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/generated.jpg');
  });

  it('should prefix a relative image path with the storage base url', () => {
    const data = { ...baseData, imageSrc: 'relative-photo.jpg' };
    render(<VolunteerDonation data={data} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/photosrelative-photo.jpg');
  });

  it('should render no image block when no image source is available', () => {
    const data = { ...baseData, imageSrc: undefined };
    render(<VolunteerDonation data={data} />);
    expect(screen.queryByTestId('image-with-caption')).not.toBeInTheDocument();
  });

  it('should render a string caption', () => {
    render(<VolunteerDonation data={baseData} />);
    expect(screen.getByText('Volunteer making a difference')).toBeInTheDocument();
  });

  it('should render no caption when caption is not a string', () => {
    render(<VolunteerDonation data={{ ...baseData, caption: undefined }} />);
    expect(screen.queryByText('Volunteer making a difference')).not.toBeInTheDocument();
  });
});
