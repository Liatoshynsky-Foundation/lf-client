import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BackdropComponent from './BackdropComponent';

describe('BackdropComponent', () => {
  it('should render without errors', () => {
    render(<BackdropComponent open data-testid="backdrop" />);
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <BackdropComponent open>
        <div data-testid="child">Hello</div>
      </BackdropComponent>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('should pass props to MUI Backdrop', async () => {
    const handleClick = jest.fn();
    render(<BackdropComponent open onClick={handleClick} data-testid="backdrop" />);
    await userEvent.click(screen.getByTestId('backdrop'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have default flex styles', () => {
    render(<BackdropComponent open data-testid="backdrop" />);
    const backdrop = screen.getByTestId('backdrop');
    expect(backdrop).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    });
  });

  it('should merge user sx styles with default', () => {
    render(
      <BackdropComponent open sx={{ justifyContent: 'flex-start', backgroundColor: 'red' }} data-testid="backdrop" />
    );
    const backdrop = screen.getByTestId('backdrop');

    expect(backdrop).toHaveStyle({
      justifyContent: 'flex-start',
      backgroundColor: 'red'
    });
  });
});
