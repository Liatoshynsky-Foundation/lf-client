import { render, screen } from '@testing-library/react';
import CustomCheckbox from './Checkbox';
import userEvent from '@testing-library/user-event';

describe('CustomCheckbox', () => {
    const label = 'Label';
    it('should display checkbox', async () => {
        render(<CustomCheckbox label={label} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(screen.queryByRole('checkbox')).not.toBeChecked();
    });
    it('should check and uncheck the checkbox', async () => {
        render(<CustomCheckbox label={label} />);
        await userEvent.click(screen.getByRole('checkbox'));
        expect(screen.getByRole('checkbox')).toBeChecked();
        await userEvent.click(screen.getByRole('checkbox'));
        expect(screen.queryByRole('checkbox')).not.toBeChecked();

    });
    it('should not toggle disabled checkbox', async () => {
        render(<CustomCheckbox disabled label={label} />);
        expect(screen.queryByRole('checkbox')).not.toBeChecked();
    });
    it('should display checked checkbox by default', async () => {
        render(<CustomCheckbox label={label} defaultChecked />);
        expect(screen.queryByRole('checkbox')).toBeChecked();
    });

});