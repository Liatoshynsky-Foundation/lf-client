import { render, screen } from '@testing-library/react';
import React from 'react';

import SheetMusicButton from './SheetMusicButton';

describe('SheetMusicButton', () => {
  it('should render with default variant contained', () => {
    render(<SheetMusicButton href="/test" label="Test Label" />);
    const button = screen.getByRole('link', { name: 'Test Label' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/test');
    expect(button).toHaveClass('MuiButton-contained');
  });

  it('should render with provided variant', () => {
    render(<SheetMusicButton href="/test2" label="Outlined Label" variant="outlined" dataTestId="test-btn" />);
    const button = screen.getByTestId('test-btn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/test2');
    expect(button).toHaveClass('MuiButton-outlined');
  });
});
