import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FooterContactInfo from './FooterContactInfo';

const contacts = {
    title: 'Test Title',
    address: '123 Test Street',
    phone: '123-456-7890',
    email: 'test@example.com',
};

describe('Contact information block inside of the Footer', () => {
    beforeEach(() => {
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn(() => Promise.resolve()),
            },
        });
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        render(<FooterContactInfo contacts={contacts} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders all contact information', () => {
        expect(screen.getByText(contacts.title)).toBeInTheDocument();
        expect(screen.getByText(contacts.address)).toBeInTheDocument();
        expect(screen.getByText(contacts.phone)).toBeInTheDocument();
        expect(screen.getByText(contacts.email)).toBeInTheDocument();
    });

    it('copies email to clipboard and shows alert when email is clicked', () => {
        const emailElement = screen.getByText(contacts.email);
        fireEvent.click(emailElement);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(contacts.email);
        expect(window.alert).toHaveBeenCalledWith('Email copied to clipboard');
    });
});
