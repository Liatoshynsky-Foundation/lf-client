import { render, screen } from '@testing-library/react';
import FooterCopyrights from './FooterCopyrights';

describe('FooterCopyrights', () => {
  const mockLinks = {
    text: 'Mock text',
    links: [
      {label: 'Mock Privacy', href: '/privacy'},
      {label: 'Mock Terms', href: '/terms'},
    ]
  };

  test('should display footer copyright text', () => {
    render(
      <FooterCopyrights text={mockLinks.text} links={mockLinks.links} />,
    );

    expect(screen.getByText(mockLinks.text)).toBeInTheDocument();
  });

  test('should display all footer links', () => {
    render(
      <FooterCopyrights text={mockLinks.text} links={mockLinks.links} />,
    );

    mockLinks.links.forEach(({ label, href }) => {
      const linkElement = screen.getByRole('link', { name: label });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', href);
    });
  });
});
