import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useRef } from 'react';

import { DropdownFilterPopper, DropdownFilterPopperHandle, useFilterPopper } from './DropdownFilterPopper';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority: _p, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => (
    <img alt="" {...props} />
  )
}));

const TEST_LABEL = 'Filter Label';
const CHIP_COUNT = 3;
const SELECTED_TEXT = 'selected';
const CHILD_TEXT = 'Popover Content';
const KEY_ENTER = 'Enter';

describe('useFilterPopper', () => {
  const TestComponent = () => {
    const { anchorEl, open, triggerRef, toggle, close, closeAndRestoreFocus } = useFilterPopper<HTMLDivElement>();
    return (
      <div>
        <div ref={triggerRef} data-testid="trigger" tabIndex={0}>
          Trigger
        </div>
        <div data-testid="open">{open ? 'true' : 'false'}</div>
        <div data-testid="anchor">{anchorEl ? 'exists' : 'null'}</div>
        <button onClick={toggle} data-testid="toggle-btn">
          Toggle
        </button>
        <button onClick={close} data-testid="close-btn">
          Close
        </button>
        <button onClick={closeAndRestoreFocus} data-testid="restore-btn">
          Restore
        </button>
      </div>
    );
  };

  it('should initialize with closed state', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('open')).toHaveTextContent('false');
    expect(screen.getByTestId('anchor')).toHaveTextContent('null');
  });

  it('should toggle open and closed states', async () => {
    render(<TestComponent />);
    const toggleBtn = screen.getByTestId('toggle-btn');

    await userEvent.click(toggleBtn);
    expect(screen.getByTestId('open')).toHaveTextContent('true');
    expect(screen.getByTestId('anchor')).toHaveTextContent('exists');

    await userEvent.click(toggleBtn);
    expect(screen.getByTestId('open')).toHaveTextContent('false');
    expect(screen.getByTestId('anchor')).toHaveTextContent('null');
  });

  it('should close popover', async () => {
    render(<TestComponent />);
    const toggleBtn = screen.getByTestId('toggle-btn');
    const closeBtn = screen.getByTestId('close-btn');

    await userEvent.click(toggleBtn);
    expect(screen.getByTestId('open')).toHaveTextContent('true');

    await userEvent.click(closeBtn);
    expect(screen.getByTestId('open')).toHaveTextContent('false');
  });

  it('should close and restore focus', async () => {
    render(<TestComponent />);
    const toggleBtn = screen.getByTestId('toggle-btn');
    const restoreBtn = screen.getByTestId('restore-btn');
    const trigger = screen.getByTestId('trigger');

    await userEvent.click(toggleBtn);
    expect(screen.getByTestId('open')).toHaveTextContent('true');

    await userEvent.click(restoreBtn);
    expect(screen.getByTestId('open')).toHaveTextContent('false');
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });
});

describe('DropdownFilterPopper', () => {
  it('should render correctly with default props', () => {
    const autoFocusRef = createRef<HTMLElement>();
    render(
      <DropdownFilterPopper label={TEST_LABEL} autoFocusRef={autoFocusRef}>
        {() => <div>{CHILD_TEXT}</div>}
      </DropdownFilterPopper>
    );

    expect(screen.getByText(TEST_LABEL)).toBeInTheDocument();
  });

  it('should open and close popover on click and trigger onClose restoring focus', async () => {
    const autoFocusRef = createRef<HTMLElement>();
    render(
      <DropdownFilterPopper label={TEST_LABEL} autoFocusRef={autoFocusRef}>
        {() => <div>{CHILD_TEXT}</div>}
      </DropdownFilterPopper>
    );

    const trigger = screen.getByRole('button', { name: new RegExp(TEST_LABEL) });
    await userEvent.click(trigger);

    expect(screen.getByText(CHILD_TEXT)).toBeInTheDocument();

    fireEvent.keyDown(document.activeElement || document.body, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByText(CHILD_TEXT)).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it('should not open when disabled', () => {
    const autoFocusRef = createRef<HTMLElement>();
    render(
      <DropdownFilterPopper label={TEST_LABEL} disabled autoFocusRef={autoFocusRef}>
        {() => <div>{CHILD_TEXT}</div>}
      </DropdownFilterPopper>
    );

    const trigger = screen.getByRole('button', { name: new RegExp(TEST_LABEL) });
    fireEvent.click(trigger);

    expect(screen.queryByText(CHILD_TEXT)).not.toBeInTheDocument();
  });

  it('should not open via keyboard when disabled', () => {
    const autoFocusRef = createRef<HTMLElement>();
    render(
      <DropdownFilterPopper label={TEST_LABEL} disabled autoFocusRef={autoFocusRef}>
        {() => <div>{CHILD_TEXT}</div>}
      </DropdownFilterPopper>
    );

    const trigger = screen.getByRole('button', { name: new RegExp(TEST_LABEL) });
    fireEvent.keyDown(trigger, { key: KEY_ENTER });
    expect(screen.queryByText(CHILD_TEXT)).not.toBeInTheDocument();
  });

  it('should render chip when chipCount > 0 and handle clearing', async () => {
    const autoFocusRef = createRef<HTMLElement>();
    const handleClear = jest.fn();
    render(
      <DropdownFilterPopper
        label={TEST_LABEL}
        chipCount={CHIP_COUNT}
        onClearChip={handleClear}
        autoFocusRef={autoFocusRef}
      >
        {() => <div>{CHILD_TEXT}</div>}
      </DropdownFilterPopper>
    );

    const chipText = `${CHIP_COUNT} ${SELECTED_TEXT}`;
    const chip = screen.getByText(chipText);
    expect(chip).toBeInTheDocument();

    const deleteButton = screen
      .getAllByRole('button', { name: new RegExp(chipText) })[0]
      .querySelector('[data-testid="delete-icon"]') as HTMLElement;
    await userEvent.click(deleteButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('should focus autoFocusRef element when opened', async () => {
    const AutoFocusTest = () => {
      const autoFocusRef = useRef<HTMLInputElement>(null);
      return (
        <>
          <DropdownFilterPopper label={TEST_LABEL} autoFocusRef={autoFocusRef}>
            {() => <input ref={autoFocusRef} data-testid="auto-input" />}
          </DropdownFilterPopper>
        </>
      );
    };

    render(<AutoFocusTest />);
    const trigger = screen.getByRole('button', { name: new RegExp(TEST_LABEL) });
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByTestId('auto-input')).toHaveFocus();
    });
  });

  it('should expose focusTrigger via popperRef handle', async () => {
    const autoFocusRef = createRef<HTMLElement>();
    const popperRef = createRef<DropdownFilterPopperHandle>();
    render(
      <DropdownFilterPopper label={TEST_LABEL} autoFocusRef={autoFocusRef} popperRef={popperRef}>
        {() => <div>{CHILD_TEXT}</div>}
      </DropdownFilterPopper>
    );

    expect(popperRef.current).not.toBeNull();
    popperRef.current?.focusTrigger();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: new RegExp(TEST_LABEL) })).toHaveFocus();
    });
  });

  it('should render outlined variant correctly', () => {
    const autoFocusRef = createRef<HTMLElement>();
    render(
      <DropdownFilterPopper label={TEST_LABEL} variant="outlined" autoFocusRef={autoFocusRef}>
        {() => <div>{CHILD_TEXT}</div>}
      </DropdownFilterPopper>
    );

    expect(screen.getByText(TEST_LABEL)).toBeInTheDocument();
  });

  it('should cover outlined variant with disabled and enabled background and border styles', () => {
    const autoFocusRef = createRef<HTMLElement>();

    const { rerender } = render(
      <DropdownFilterPopper label={TEST_LABEL} variant="outlined" disabled autoFocusRef={autoFocusRef}>
        {() => <div>{CHILD_TEXT}</div>}
      </DropdownFilterPopper>
    );

    rerender(
      <DropdownFilterPopper label={TEST_LABEL} variant="outlined" disabled={false} autoFocusRef={autoFocusRef}>
        {() => <div>{CHILD_TEXT}</div>}
      </DropdownFilterPopper>
    );

    expect(screen.getByText(TEST_LABEL)).toBeInTheDocument();
  });
});
