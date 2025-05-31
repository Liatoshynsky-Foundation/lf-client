import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterNavigation from './FooterNavigation';
import { sections } from './FooterNavigation';

describe('FooterNavigation', () => {
  test('should display all section titles', () => {
    render(<FooterNavigation />);

    sections.forEach((section) => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  test('should display all links with correct labels and hrefs', () => {
    render(<FooterNavigation />);

    sections.forEach((section) => {
      section.links.forEach(({ label, href }) => {
        const linkElement = screen.getByRole('link', { name: label });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', href);
      });
    });
  });
});
