import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ModalComponent from './ModalComponent';

jest.mock('~/components/backdrop-component/BackdropComponent', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="mock-backdrop" {...props} />
}));

jest.mock('~/components/paper-component/PaperComponent', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="mock-paper" {...props} />
}));

describe('ModalComponent', () => {
  it('should render children', () => {
    render(
      <ModalComponent open>
        <div data-testid="child">Hello</div>
      </ModalComponent>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should use mocked BackdropComponent and PaperComponent by default', () => {
    render(<ModalComponent open>content</ModalComponent>);

    expect(screen.getByTestId('mock-backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('mock-paper')).toBeInTheDocument();
  });

  it('should allow overriding slots via props', () => {
    const CustomBackdrop = () => <div data-testid="custom-backdrop" />;
    const CustomPaper = () => <div data-testid="custom-paper" />;

    render(
      <ModalComponent
        open
        slots={{
          backdrop: CustomBackdrop,
          paper: CustomPaper
        }}
      >
        custom content
      </ModalComponent>
    );

    expect(screen.getByTestId('custom-backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('custom-paper')).toBeInTheDocument();
  });

  it('should pass other props to Dialog', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();

    render(
      <ModalComponent open onClose={handleClose}>
        <div>content</div>
      </ModalComponent>
    );

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalled();
  });
});
