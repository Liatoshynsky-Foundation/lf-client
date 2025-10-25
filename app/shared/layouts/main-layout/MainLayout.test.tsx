import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import MainLayout from './MainLayout';

jest.mock('~/components/column-guides/ColumnGuides', () => ({
  ColumnGuides: () => <div data-testid="column-guides" />
}));

describe('MainLayout Component', () => {
  const childText = 'Hello World';
  const childElement = <div>{childText}</div>;

  it('should render its children correctly', () => {
    render(<MainLayout>{childElement}</MainLayout>);
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('should not render ColumnGuides when withLines is false or undefined', () => {
    const { rerender } = render(<MainLayout>{childElement}</MainLayout>);
    expect(screen.queryByTestId('column-guides')).not.toBeInTheDocument();
    rerender(<MainLayout withLines={false}>{childElement}</MainLayout>);
    expect(screen.queryByTestId('column-guides')).not.toBeInTheDocument();
  });

  it('should render ColumnGuides when withLines is true', () => {
    render(<MainLayout withLines>{childElement}</MainLayout>);
    expect(screen.getByTestId('column-guides')).toBeInTheDocument();
  });

  it('should forward additional props to the root Box element', () => {
    const testId = 'main-layout-container';
    const customClass = 'my-custom-class';

    render(
      <MainLayout data-testid={testId} className={customClass}>
        {childElement}
      </MainLayout>
    );

    const layoutElement = screen.getByTestId(testId);
    expect(layoutElement).toHaveClass(customClass);
  });

  it('should apply base styles and merge sx prop when it is an object', () => {
    const testId = 'styled-layout';
    const customSx = { backgroundColor: 'rgb(255, 0, 0)', padding: '10px' };

    render(
      <MainLayout data-testid={testId} sx={customSx}>
        {childElement}
      </MainLayout>
    );

    const layoutElement = screen.getByTestId(testId);
    expect(layoutElement).toHaveStyle(`background-color: ${customSx.backgroundColor}`);
    expect(layoutElement).toHaveStyle(`padding: ${customSx.padding}`);
  });

  it('should apply base styles and merge sx prop when it is an array', () => {
    const testId = 'array-styled-layout';
    const customSxArray = [{ color: 'rgb(0, 0, 255)' }, { margin: '20px' }];

    render(
      <MainLayout data-testid={testId} sx={customSxArray}>
        {childElement}
      </MainLayout>
    );

    const layoutElement = screen.getByTestId(testId);
    expect(layoutElement).toHaveStyle('color: rgb(0, 0, 255)');
    expect(layoutElement).toHaveStyle('margin: 20px');
  });
});
