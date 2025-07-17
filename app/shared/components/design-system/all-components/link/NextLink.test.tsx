import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';
import React from 'react';

import { Link } from './NextLink';

const pushMock = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

describe('Link', () => {
  beforeEach(() => {
    (nextRouter.useRouter as jest.Mock).mockReturnValue({
      pathname: '/test',
      push: pushMock
    });
    pushMock.mockClear();
  });

  it('should render NextLinkComposed when noLinkStyle is true', () => {
    render(
      <Link href="/test" noLinkStyle data-testid="custom-link">
        No Style Link
      </Link>
    );
    const link = screen.getByTestId('custom-link');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('should render MuiLink by default', () => {
    render(
      <Link href="/test" data-testid="mui-link">
        Mui Link
      </Link>
    );
    const link = screen.getByTestId('mui-link');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('should apply activeClassName if route matches', () => {
    render(
      <Link href="/test" activeClassName="is-active" data-testid="active-link">
        Active Link
      </Link>
    );
    const link = screen.getByTestId('active-link');
    expect(link).toHaveClass('is-active');
  });

  it('should not apply activeClassName if route does not match', () => {
    (nextRouter.useRouter as jest.Mock).mockReturnValue({
      pathname: '/other',
      push: pushMock
    });
    render(
      <Link href="/test" activeClassName="is-active" data-testid="inactive-link">
        Inactive Link
      </Link>
    );
    const link = screen.getByTestId('inactive-link');
    expect(link).not.toHaveClass('is-active');
  });

  it('should call router.push on click (MuiLink)', () => {
    render(
      <Link href="/test" data-testid="mui-link-click">
        Clickable Link
      </Link>
    );
    const link = screen.getByTestId('mui-link-click');
    fireEvent.click(link);
    expect(pushMock).toHaveBeenCalledWith('/test');
  });

  it('should pass className and other props to MuiLink', () => {
    render(
      <Link href="/test" className="custom-class" data-testid="mui-link-props" aria-label="label">
        Mui Link
      </Link>
    );
    const link = screen.getByTestId('mui-link-props');
    expect(link).toHaveClass('custom-class');
    expect(link).toHaveAttribute('aria-label', 'label');
  });

  it('should use linkAs prop if provided', () => {
    render(
      <Link href="/test" linkAs="/alias" data-testid="mui-link-alias">
        Mui Link
      </Link>
    );
    const link = screen.getByTestId('mui-link-alias');
    expect(link).toBeInTheDocument();
  });

  it('should use as prop if linkAs is not provided', () => {
    render(
      <Link href="/test" as="/as-alias" data-testid="mui-link-as">
        Mui Link
      </Link>
    );
    const link = screen.getByTestId('mui-link-as');
    expect(link).toBeInTheDocument();
  });

  it('should handle object href with pathname', () => {
    render(
      <Link href={{ pathname: '/test' }} data-testid="mui-link-obj">
        Mui Link
      </Link>
    );
    const link = screen.getByTestId('mui-link-obj');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(pushMock).toHaveBeenCalledWith({ pathname: '/test' });
  });

  it('should call custom onClick if provided (noLinkStyle)', () => {
    const onClick = jest.fn();
    render(
      <Link href="/test" noLinkStyle onClick={onClick} data-testid="custom-link-click">
        No Style Link
      </Link>
    );
    const link = screen.getByTestId('custom-link-click');
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalled();
  });
});
