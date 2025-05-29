import { render, screen } from '@testing-library/react';
import FooterCopyrights from './FooterCopyrights';
import { footerData } from '../Footer';

describe('FooterCopyrights', () => {
  test('should display footer copyright text', () => {
    render(
      <FooterCopyrights text={footerData.text} links={footerData.links} />,
    );

    expect(screen.getByText(footerData.text)).toBeInTheDocument();
  });

  test('should display all footer links', () => {
    render(
      <FooterCopyrights text={footerData.text} links={footerData.links} />,
    );

    footerData.links.forEach(({ label, href }) => {
      const linkElement = screen.getByRole('link', { name: label });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', href);
    });
  });
});
