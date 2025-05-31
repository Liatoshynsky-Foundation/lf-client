import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterNavigation from './FooterNavigation';

describe('FooterNavigation', () => {
  const mockSections = [
    {
      title: 'Section 1',
      links: [
        { label: 'Link 1.1', href: '/link-1-1' },
        { label: 'Link 1.2', href: '/link-1-2' }
      ]
    },
    {
      title: 'Section 2',
      links: [
        { label: 'Link 2.1', href: '/link-2-1' },
        { label: 'Link 2.2', href: '/link-2-2' }
      ]
    }
  ];

  test('should display all section titles', () => {
    render(<FooterNavigation sections={mockSections} />);

    mockSections.forEach((section) => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  test('should display all links with correct labels and hrefs', () => {
    render(<FooterNavigation sections={mockSections} />);

    mockSections.forEach((section) => {
      section.links.forEach(({ label, href }) => {
        const linkElement = screen.getByRole('link', { name: label });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', href);
      });
    });
  });
});
