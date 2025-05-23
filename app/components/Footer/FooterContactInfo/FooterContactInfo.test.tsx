import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterContactInfo from './FooterContactInfo';

const contacts = {
    title: 'Test Title',
    address: '123 Test Street',
    phone: '123-456-7890',
    email: 'test@example.com',
};

describe('Contact information block inside of the Footer', () => {
    beforeEach(() => {
        render(<FooterContactInfo contacts={contacts} />);
    });

    it('renders all contact information', () => {
        expect(screen.getByText(contacts.title)).toBeInTheDocument();
        expect(screen.getByText(contacts.phone)).toBeInTheDocument();
        expect(screen.getByText(contacts.email)).toBeInTheDocument();
    });

    it('renders mailto email link with correct href', () => {
        const emailLink = screen.getByRole('link', { name: contacts.email });
        expect(emailLink).toHaveAttribute('href', `mailto:${contacts.email}`);
    });

    it('renders tel phone link with correct href', () => {
        const phoneLink = screen.getByRole('link', { name: contacts.phone });
        expect(phoneLink).toHaveAttribute('href', `tel:${contacts.phone}`);
    })
});
