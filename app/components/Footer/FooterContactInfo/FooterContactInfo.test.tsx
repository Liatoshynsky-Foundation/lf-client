import React, { act } from 'react';
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
        jest.useFakeTimers();

        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn(() => Promise.resolve()),
            },
        });
        jest.spyOn(global, 'setTimeout');
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
        const copyEmailElement = screen.getByAltText('Copy');
        fireEvent.click(copyEmailElement);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(contacts.email);
        expect(window.alert).toHaveBeenCalledWith('Email copied to clipboard');
    });

    it('reverts icon back to copy after timeout', () => {
        const copyEmailElement = screen.getByAltText('Copy');
        fireEvent.click(copyEmailElement);

        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
        expect(setTimeout).toHaveBeenCalledTimes(1);

        expect(screen.getByAltText('Copied')).toBeInTheDocument();

        act(() => {
            jest.runAllTimers();
        });

        expect(screen.getByAltText('Copy')).toBeInTheDocument();
    });

    it('does not copy email if already copied', () => {
        const copyEmailElement = screen.getByAltText('Copy');
        fireEvent.click(copyEmailElement);
        fireEvent.click(copyEmailElement);

        expect(screen.getByAltText('Copied')).toBeInTheDocument();
        expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledTimes(1);
    });
});
