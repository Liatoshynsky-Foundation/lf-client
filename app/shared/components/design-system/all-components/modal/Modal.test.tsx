import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from './Modal';
import { PositionEnum } from '~/types/enums/common.enums';

describe('Modal', () => {
  it('should render Modal', () => {
    const expectedTitle = 'testModal';
    render(<Modal open={true} handleClose={() => {}} title="testModal" />);
    const titleElement = document.getElementById('modal-modal-title');
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });

  it('should not render', () => {
    render(<Modal open={false} handleClose={() => {}} title="testModal" />);
    const titleElement = document.getElementById('modal-modal-title');
    expect(titleElement).not.toBeInTheDocument();
  });

  it('should render without subTitle', () => {
    render(<Modal open={true} handleClose={() => {}} title="testModal" />);

    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });

  it('should render subTitle', () => {
    const expectedSubtitle = 'testSubtitle';
    render(<Modal open={true} handleClose={() => {}} title="testModal" subtitle="testSubtitle" />);

    expect(screen.getByText(expectedSubtitle)).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <Modal open={true} handleClose={() => {}} title="testModal">
        TestText
      </Modal>
    );
    expect(screen.getByText('TestText')).toBeInTheDocument();
  });

  it('should close by clicking on button', async () => {
    const handleClose = jest.fn();
    render(<Modal open={true} handleClose={handleClose} title="testModal" />);
    const btn = screen.getByRole('button');
    await userEvent.click(btn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should render title correctly', () => {
    render(<Modal open={true} handleClose={() => {}} title="testModal" />);
    const title = screen.getByRole('heading', { name: /testModal/i });
    expect(title.tagName).toBe('H3');
  });

  it('should render title correctly', () => {
    render(<Modal open={true} handleClose={() => {}} title="testModal" width={500} />);
    const title = screen.getByRole('heading', { name: /testModal/i });
    expect(title.tagName).toBe('H4');
  });

  it('should correct filter based on backgroundColor for burgundy', () => {
    render(<Modal open={true} handleClose={() => {}} title="testModal" backgroundColor="burgundy" />);

    const iconWrapper = screen.getByAltText(/closing modal/i).parentElement;
    expect(iconWrapper).toHaveStyle('filter: brightness(0) invert(1)');
  });

  it('should correct filter based on backgroundColor for white', () => {
    render(<Modal open={true} handleClose={() => {}} title="testModal" backgroundColor="white" />);

    const iconWrapper = screen.getByAltText(/closing modal/i).parentElement;
    expect(iconWrapper).toHaveStyle('filter: brightness(0) saturate(100%)');
  });

  it('should return correct verticalPositions for top and left', () => {
    const expectedStyles = {
      top: '0px',
      marginTop: '20px',
      left: '0px'
    };
    render(
      <Modal
        open={true}
        handleClose={() => {}}
        title="testModal"
        verticalAlignment={PositionEnum.Top}
        horizontalAlignment={PositionEnum.Left}
      />
    );
    const box = screen.getByTestId('modal');

    expect(box).toHaveStyle(expectedStyles);
  });

  it('should return correct verticalPositions for bottom and right', () => {
    const expectedStyles = {
      top: 'revert-layer',
      marginBottom: '20px',
      right: '0px'
    };
    render(
      <Modal
        open={true}
        handleClose={() => {}}
        title="testModal"
        verticalAlignment={PositionEnum.Bottom}
        horizontalAlignment={PositionEnum.Right}
      />
    );
    const box = screen.getByTestId('modal');

    expect(box).toHaveStyle(expectedStyles);
  });

  it('should render topline', () => {
    const expectedStyles = {
      marginLeft: '-110px'
    };
    render(<Modal open={true} handleClose={() => {}} title="testModal" topLine />);
    const box = screen.getByTestId('modal-topline');

    expect(box).toHaveStyle(expectedStyles);
  });

  it('should render topline for smaller modals', () => {
    const expectedStyles = {
      marginLeft: '-32px'
    };
    render(<Modal open={true} handleClose={() => {}} width={500} title="testModal" topLine />);
    const box = screen.getByTestId('modal-topline');

    expect(box).toHaveStyle(expectedStyles);
  });
});
