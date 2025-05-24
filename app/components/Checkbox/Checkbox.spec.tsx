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
        await userEvent.click(screen.getByRole('checkbox'));
        expect(screen.getByRole('checkbox')).toBeChecked();
    });
    it('should check and uncheck the checkbox', async () => {
        await userEvent.click(screen.getByRole('checkbox'));
        expect(screen.getByRole('checkbox')).toBeChecked();
        await userEvent.click(screen.getByRole('checkbox'));
        expect(screen.queryByRole('checkbox')).not.toBeChecked();

    });
    it('should not toggle disabled checkbox', async () => {
        const disabled = true;
        render(<CustomCheckbox disabled={disabled} label={label} />);
        await userEvent.click(screen.getByRole('checkbox'));
        expect(screen.queryByRole('checkbox')).not.toBeChecked();
    });
    it('should display checked checkbox by default', async () => {
        const disabled = true;
        render(<CustomCheckbox disabled={disabled} label={label} />);
        await userEvent.click(screen.getByRole('checkbox'));
        expect(screen.queryByRole('checkbox')).not.toBeChecked();
    });

});