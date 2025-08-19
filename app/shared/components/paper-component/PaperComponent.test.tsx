import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PaperComponent from './PaperComponent';

describe('PaperComponent', () => {
  it('should render children correctly', () => {
    render(
      <PaperComponent isModal={false}>
        <div>Children</div>
      </PaperComponent>
    );
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('should render close icon when modal and trigger onClose', async () => {
    const onClose = jest.fn();
    render(
      <PaperComponent isModal={true} onClose={onClose}>
        <div>Modal Content</div>
      </PaperComponent>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not render close icon when not modal', () => {
    render(
      <PaperComponent isModal={false}>
        <div>Block Content</div>
      </PaperComponent>
    );

    const button = screen.queryByRole('button');
    expect(button).toBeNull();
  });
});
