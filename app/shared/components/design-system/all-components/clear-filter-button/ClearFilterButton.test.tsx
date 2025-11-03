import { fireEvent, render, screen } from '@testing-library/react';

import ClearFilterButton from './ClearFilterButton';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ alt }: any) => <svg data-testid="svg-icon" aria-label={alt} />
}));

jest.mock('~/public/icons/trash-2.svg', () => {
  const MockTrashIcon = () => <svg data-testid="trash-icon" />;
  MockTrashIcon.displayName = 'TrashIcon';
  return MockTrashIcon;
});

describe('ClearFilterButton', () => {
  it('should render with text', () => {
    render(<ClearFilterButton onClick={() => {}}>Clear</ClearFilterButton>);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(<ClearFilterButton onClick={onClick}>Clear</ClearFilterButton>);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render start icon', () => {
    render(<ClearFilterButton onClick={() => {}}>Clear</ClearFilterButton>);
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).not.toBeNull();
  });
});
