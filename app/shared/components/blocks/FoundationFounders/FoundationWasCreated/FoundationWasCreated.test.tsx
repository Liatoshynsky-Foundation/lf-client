import { render, screen } from '@testing-library/react';
import React from 'react';

import FoundationWasCreated from './FoundationWasCreated';

describe('FoundationWasCreated', () => {
  it('should render the title and description correctly', () => {
    render(
      <FoundationWasCreated
        title="Фундація Лятошинського, заснована"
        description="у 2023 році Тетяною Гомон, Іриною Туковою та Павлом Піміновим..."
      />
    );

    expect(screen.getByText(/Фундація Лятошинського, заснована/i)).toBeInTheDocument();
    expect(screen.getByText(/у 2023 році Тетяною Гомон/i)).toBeInTheDocument();
  });
});
