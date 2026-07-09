import { render } from '@testing-library/react';
import React from 'react';

import { ErrorPageFactory } from './errorPageFactory';
import { LocalizationErrors } from '~/constants/errors';

jest.mock('~/[lang]/[...unknown-route]/page-not-found/PageNotFound', () => ({
  PageNotFound: () => <div data-testid="page-not-found" />
}));

jest.mock('~/shared/components/blocks/translation-not-found/TranslationNotFound', () => ({
  __esModule: true,
  default: () => <div data-testid="translation-not-found" />
}));

describe('ErrorPageFactory', () => {
  it('should return TranslationNotFound component when missing english translation error occurs', () => {
    const { getByTestId } = render(ErrorPageFactory(LocalizationErrors.MISSING_EN_ERROR));
    expect(getByTestId('translation-not-found')).toBeInTheDocument();
  });

  it('should return PageNotFound component when missing ukrainian translation error occurs', () => {
    const { getByTestId } = render(ErrorPageFactory(LocalizationErrors.MISSING_UK_ERROR));
    expect(getByTestId('page-not-found')).toBeInTheDocument();
  });

  it('should throw an unhandled error exception if an unmapped error code is provided', () => {
    expect(() => ErrorPageFactory('UNKNOWN_ERROR_CODE')).toThrow(
      'Unexpected error when fetching page: UNKNOWN_ERROR_CODE'
    );
  });
});
