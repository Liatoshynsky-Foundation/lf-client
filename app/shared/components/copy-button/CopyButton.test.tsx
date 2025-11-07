import { act, fireEvent, render, screen } from '@testing-library/react';

import { CopyButton } from './CopyButton';

const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: { writeText: mockWriteText }
});

jest.useFakeTimers();

describe('CopyButton component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('Should render without crashing', () => {
    render(<CopyButton targetRef={{ current: document.createElement('span') }} />);
    expect(screen.getByRole('button', { name: /copy content/i })).toBeInTheDocument();
  });

  it('Should copy text from targetRef when clicked', async () => {
    const span = document.createElement('span');
    span.textContent = 'test text';
    render(<CopyButton targetRef={{ current: span }} />);

    const button = screen.getByRole('button', { name: /copy content/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockWriteText).toHaveBeenCalledWith('test text');
  });

  it('Should show tooltip with default hint after copy', async () => {
    const span = document.createElement('span');
    span.textContent = 'sample';
    render(<CopyButton targetRef={{ current: span }} />);

    const button = screen.getByRole('button', { name: /copy content/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(await screen.findByText(/copied/i)).toBeInTheDocument();
  });

  it('Should show tooltip with custom hint if provided', async () => {
    const span = document.createElement('span');
    span.textContent = 'value';
    render(<CopyButton targetRef={{ current: span }} hint="Custom hint" />);

    const button = screen.getByRole('button', { name: /copy content/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(await screen.findByText(/custom hint/i)).toBeInTheDocument();
  });

  it('Should hide tooltip after delay', async () => {
    const span = document.createElement('span');
    span.textContent = 'timeout test';
    render(<CopyButton targetRef={{ current: span }} delay={2000} />);

    const button = screen.getByRole('button', { name: /copy content/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(await screen.findByText(/copied/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/copied/i)).not.toBeVisible();
  });

  it('Should not crash if targetRef is null', async () => {
    render(<CopyButton targetRef={{ current: null }} />);
    const button = screen.getByRole('button', { name: /copy content/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockWriteText).not.toHaveBeenCalled();
  });
});
