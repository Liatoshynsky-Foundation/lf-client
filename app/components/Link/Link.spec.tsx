import { render, screen } from '@testing-library/react';
import CustomLink from './Link';
import '@testing-library/jest-dom';
import HomeSvg from '../../public/house.svg';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';


describe('CustomLink', () => {
    test('should render CustomLink with correct text and href', () => {
        render(<CustomLink path="/test">Test Link</CustomLink>);

        const link = screen.getByRole('link', { name: /test link/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test');
    });

    test('should render front icon', () => {
        render(
            <CustomLink path="/" frontIcon={<AccessAlarmIcon data-testid="front-icon" />}>
                With Icon
            </CustomLink>
        );
        expect(screen.getByText(/With Icon/i)).toBeInTheDocument();
        expect(screen.getByTestId('front-icon')).toBeInTheDocument();
    });

    test('should render back icon (SVG image)', () => {
        render(
            <CustomLink path="/with-back-icon" backIcon={HomeSvg}>
                With Back Icon
            </CustomLink>
        );
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src');
    });


});
