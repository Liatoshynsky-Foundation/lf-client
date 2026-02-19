import { render, screen } from '@testing-library/react';

import ArtistrySection from './ArtistrySection';

const mockTipTapDoc = {
  type: 'doc',
  content: []
} as any;

const mockProps = {
  subTitle: { uk: 'Підзаголовок', en: 'Subtitle' },
  textContent: {
    uk: mockTipTapDoc,
    en: mockTipTapDoc
  },
  buttonText: { uk: 'Натисни мене', en: 'Click me' },
  buttonLink: '/test-link'
};

jest.mock('next-intl', () => ({
  useLocale: () => 'uk'
}));

jest.mock('../terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => {
  return function MockButtonBlock({ buttonText }: any) {
    return <button data-testid="ButtonContentBlock-button">{buttonText}</button>;
  };
});

describe('ArtistrySection Component', () => {
  it('should render the correct subtitle based on locale', () => {
    render(<ArtistrySection {...mockProps} />);

    const subTitleElement = screen.getByText(mockProps.subTitle.uk);
    expect(subTitleElement).toBeInTheDocument();
    expect(subTitleElement.tagName).toBe('H5');
  });

  it('should render button with localized text', () => {
    render(<ArtistrySection {...mockProps} />);

    expect(screen.getByTestId('ButtonContentBlock-button')).toHaveTextContent('Натисни мене');
  });
});
