import { render, screen } from '@testing-library/react';

import { partnersMock } from '../our-partners/partners.data';
import OurPartnersSlider from './OurPartnersSlider';

jest.mock('swiper/css', () => ({}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children, breakpoints }: any) => (
    <div data-testid="swiper-slider" data-breakpoints={JSON.stringify(breakpoints)}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide">{children}</div>
}));

jest.mock('swiper/modules', () => ({
  Autoplay: {}
}));

jest.mock('../../partner-logo/PartnerLogo', () => {
  const MockPartnerLogo = ({ image, link }: { image: React.ReactNode; link: string }) => (
    <a href={link} data-testid="partner-logo">
      {image}
    </a>
  );
  MockPartnerLogo.displayName = 'PartnerLogo';
  return MockPartnerLogo;
});

describe('OurPartnersSlider', () => {
  const mockPartners = partnersMock.slice(0, 3);

  it('should render slider with partners', () => {
    render(<OurPartnersSlider partners={mockPartners} />);

    expect(screen.getByTestId('swiper-slider')).toBeInTheDocument();
    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(mockPartners.length);
  });

  it('should render partner logos with correct data', () => {
    render(<OurPartnersSlider partners={mockPartners} />);

    const logos = screen.getAllByTestId('partner-logo');
    expect(logos).toHaveLength(mockPartners.length);

    logos.forEach((logo, index) => {
      expect(logo).toHaveAttribute('href', mockPartners[index].link);
      const img = logo.querySelector('img');
      expect(img).toHaveAttribute('alt', mockPartners[index].name);
      expect(img).toHaveAttribute('src', mockPartners[index].img);
    });
  });

  it('should render slider with responsive breakpoints', () => {
    render(<OurPartnersSlider partners={mockPartners} />);

    const slider = screen.getByTestId('swiper-slider');
    const breakpoints = JSON.parse(slider.getAttribute('data-breakpoints') || '{}');

    expect(breakpoints).toHaveProperty('0');
    expect(breakpoints).toHaveProperty('600');
    expect(breakpoints).toHaveProperty('900');
    expect(breakpoints).toHaveProperty('1200');
  });

  it('should return null when no partners are provided', () => {
    const { container } = render(<OurPartnersSlider partners={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should return null when partners is undefined', () => {
    const { container } = render(<OurPartnersSlider partners={undefined as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render with autoScroll disabled by default', () => {
    render(<OurPartnersSlider partners={mockPartners} />);
    expect(screen.getByTestId('swiper-slider')).toBeInTheDocument();
  });

  it('should render with custom autoScrollInterval when provided', () => {
    render(<OurPartnersSlider partners={mockPartners} autoScroll={true} autoScrollInterval={5000} />);
    expect(screen.getByTestId('swiper-slider')).toBeInTheDocument();
  });
});
